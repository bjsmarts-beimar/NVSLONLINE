#from django.shortcuts import render
from django.http import HttpResponse
from NVSLOnline.models import Divisions
#integramo la serializacion de los objetos
from django.core import serializers
# Create your views here.

def wsDivisions_view(request):
   #data = serializers.serialize("json", Divisions.objects.filter(IsHidden = False))

    data = serializers.serialize("json", Divisions.objects.filter(IsHidden = False))
    #retorns data json
    #return HttpResponse(data, content_type='aplication/json')
    return HttpResponse(data)
    #return HttpResponse(data, mimetype='aplication/json')
    #return HttpResponse({'foo':'bar'})



