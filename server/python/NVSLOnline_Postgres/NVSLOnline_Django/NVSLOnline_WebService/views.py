#from django.shortcuts import render
from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from NVSLOnline.models import Divisions,Seasons,Teams
#integramo la serializacion de los objetos
from django.core import serializers

import json
# Create your views here.

###################################### divisions ###############################
def wsDivisions_view(request):
   #data = serializers.serialize("json", Divisions.objects.filter(IsHidden = False))
    if request.method == "GET":
        data = serializers.serialize("json", Divisions.objects.filter(IsHidden = False))
    #retorns data json
        return HttpResponse(data, content_type='aplication/json')
    elif request.method == "POST":
        body_unicode = request.body.decode('utf-8')
        data = json.loads(body_unicode)
        
        objDivisions = Divisions()
        objDivisions.DivisionName = data['DivisionName']
        objDivisions.IsHidden = False
        objDivisions.save()
        return HttpResponse(objDivisions.pk, content_type='aplication/json')

def wsDivisions(request, Id=None):
    if request.method == "GET":
        #division = get_objects_or_404(Divisions,pk=Id)
        #objDivision = Divisions.objects.get(pk=request.get['pk'])
        #data = serializers.serialize("json", division)

        data = serializers.serialize("json", Divisions.objects.filter(Id = Id))
        #data = serializers.serialize("json", Divisions.objects.get(Id = Id))
        #data = serializers.serialize("json", get_object_or_404(Divisions, pk=Id))
    #retorns data json
        return HttpResponse(data, content_type='aplication/json')
    elif request.method == "PUT":
        modelform =  modelform_factory(Divisions)
        form = modelform(request.PUT)
        if form.is_valid():
            form.save()

    elif request.method == "DELETE":
        Divisions.objects.get(pk=request.Delete['pk']).delete()
        return HttpResponse('Ok')

###################################### seasons ###################################
def wsSeasons(request):
       #data = serializers.serialize("json", Divisions.objects.filter(IsHidden = False))
    if request.method == "GET":
        data = serializers.serialize("json", Seasons.objects.filter(IsHidden = False))
    #retorns data json
        return HttpResponse(data, content_type='aplication/json')
    elif request.method == "POST":
        objSeasons = Seasons()
        objSeasons.SeasonName = "Second"
        objSeasons.Active = False
        objSeasons.IsHidden = False
        objSeasons.SeasonStart = False
        objSeasons.SeasonEnd = False
        objSeasons.save()
        return HttpResponse(objSeasons.pk, content_type='aplication/json')




###################################### teams ###################################
def wsTeams(request):
    if request.method == "GET":
        data = serializers.serialize("json", Teams.objects.select_related('').filter(IsHidden = False))
    #retorns data json
        return HttpResponse(data, content_type='aplication/json')
    elif request.method == "POST":
        objTeams = Teams()
        objTeams.DivisionName = "Second"
        objTeams.IsHidden = False
        objTeams.DivisionId = 1
        objTeams.save()
        return HttpResponse(objTeams.pk, content_type='aplication/json')
