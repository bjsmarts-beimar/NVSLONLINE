#from django.shortcuts import render
from django.http import HttpResponse
from NVSLOnline.models import Divisions,Teams
#integramo la serializacion de los objetos
from django.core import serializers
# Create your views here.

###################################### divisions ###############################
def wsDivisions_view(request):
   #data = serializers.serialize("json", Divisions.objects.filter(IsHidden = False))
    if request.method == "GET":
        data = serializers.serialize("json", Divisions.objects.filter(IsHidden = False))
    #retorns data json
        return HttpResponse(data, content_type='aplication/json')
    elif request.method == "POST":
        objDivisions = Divisions()
        objDivisions.DivisionName = "Second"
        objDivisions.IsHidden = False
        objDivisions.save()
        return HttpResponse(objDivisions.pk, content_type='aplication/json')

###################################### teams ###################################
def wsTeams(request):
    if request.method == "GET":
        data = serializers.serialize("json", Teams.objects.select_related('').filter(IsHidden = False))
    #retorns data json
        return HttpResponse(data, content_type='aplication/json')
    #elif request.method == "POST":
