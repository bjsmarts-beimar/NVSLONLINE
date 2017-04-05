#from django.shortcuts import render
from NVSLOnline.models import Divisions,Seasons,Venues,Teams,Schedules
from django.shortcuts import get_object_or_404
from  rest_framework.response import Response
from rest_framework.views import APIView
from NVSLOnline_WebService.serializers import DivisionSerializer,SeasonSerializer,VenueSerializer,TeamSerializer,ScheduleSerializer

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

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)# request.POST y request.GET, request.FILES
        if serializer.is_valid():
            division = Divisions(
                DivisionName = serializer.data['DivisionName'],
                IsHidden = False
            )
            division.save()
            resp = self.serializer_class(division,many=False)
            return Response(resp.data)
            
        else:
           return Response(serializer.errors)
            
class Season(APIView):
    serializer_class = SeasonSerializer
    def get(self, request, id=None, format=None):
        if id!=None:
            seasons = get_object_or_404(Seasons, pk=id)
            many = False
        else:
            seasons = Seasons.objects.filter(IsHidden = False)
            many = True
        response = self.serializer_class(seasons,many=many)
        return Response(response.data)

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)# request.POST y request.GET, request.FILES
        if serializer.is_valid():
            season = Seasons(
                SeasonName = serializer.data['SeasonName'],
                IsHidden = False
            )
            season.save()
            resp = self.serializer_class(season,many=False)
            return Response(resp.data)
            
        else:
           return Response(serializer.errors)

class Venue(APIView):
    def get(self, request, format=None):
        return Response({'mensaje':'holamundo django rest_framework'})

class Team(APIView):
    serializer_class = TeamSerializer
    def get(self, request, id=None, format=None):
        if id!=None:
            teams = get_object_or_404(Teams, pk=id)
            many = False
        else:
            teams = Teams.objects.filter(IsHidden = False)
            many = True
        response = self.serializer_class(teams,many=many)
        return Response(response.data)

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)# request.POST y request.GET, request.FILES
        if serializer.is_valid():
            team = Teams(
                TeamName = serializer.data['TeamName'],
                #Division = 
                Division = serializer.data['Division'],
                Season = serializer.data['Season'],
                IsHidden = False
            )
            team.save()
            resp = self.serializer_class(team,many=False)
            #return Response(resp.data)
            return Response(resp.data)
        else:
           return Response(serializer.errors)

class Schedule(APIView):
    def get(self, request, format=None):
        return Response({'mensaje':'holamundo django rest_framework'})