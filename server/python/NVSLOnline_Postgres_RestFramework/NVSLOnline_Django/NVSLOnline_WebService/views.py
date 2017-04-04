#from django.shortcuts import render
from NVSLOnline.models import Divisions
from django.shortcuts import get_object_or_404
from  rest_framework.response import Response
from rest_framework.views import APIView
from NVSLOnline_WebService.serializers import DivisionSerializer

# Create your views here.
class HolaMundo(APIView):
    def get(self, request, format=None):
        return Response({'mensaje':'holamundo django rest_framework'})

#hola_mundo = HolaMundo.as_view()

class Division(APIView):
    serializer_class = DivisionSerializer
    def get(self, request, id=None, format=None):
        if id!=None:
            divisions = get_object_or_404(Divisions, pk=id)
            many = False
        else:
            divisions = Divisions.objects.filter(IsHidden = False)
            many = True
        response = self.serializer_class(divisions,many=many)
        return Response(response.data)
    def post(self,request, format=None):
        objDivision = self.serializer_class(data=request.DATA)# request.POST y request.GET, request.FILES
        if objDivision.is_valid():
            obj = objDivision.object
            obj.save()
            resp = self.serializer_class(obj,many=False)
            return Response(resp.data)
        else:
            print objDivisions.errors
