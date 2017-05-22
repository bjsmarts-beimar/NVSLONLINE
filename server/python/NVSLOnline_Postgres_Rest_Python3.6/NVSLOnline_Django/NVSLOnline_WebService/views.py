
from NVSLOnline.models import Divisions,Seasons,Venues,Teams,Schedules,Players,News,Contacts
from django.contrib.auth.models import User 
from django.db.models import Q 

from pprint import pprint

from django.contrib.auth import authenticate
from django.shortcuts import get_object_or_404
from rest_framework import viewsets,status
from rest_framework.response import Response
from rest_framework.views import APIView

from NVSLOnline_WebService import serializers as NVSLOnline_serializer

from django.core import serializers
import datetime,json
from time import gmtime

from django.utils import formats
# Create your views here.

EXITS = 'Already existing'

class Division(APIView):
    serializer_class = NVSLOnline_serializer.DivisionSerializer
    def get(self, request, id=None, format=None):
        if id!=None:
            divisions = get_object_or_404(Divisions, pk=id)
            many = False
        else:
            divisions = Divisions.objects.filter(IsHidden = False).order_by('Id')
            many = True
        response = self.serializer_class(divisions,many=many)
        return Response(response.data)

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)# request.POST y request.GET, request.FILES
        
        if serializer.is_valid():
            try:
                oFound = Divisions.objects.get(DivisionName__iexact = serializer.data['DivisionName'],IsHidden=False)
                # Duplicate
                return Response(EXITS,status=204)
            except Divisions.DoesNotExist:
                # No Duplicate
                division = Divisions(
                    DivisionName = serializer.data['DivisionName'],
                    IsHidden = False
                )
                
                division.save()
                resp = self.serializer_class(division,many=False)
                return Response(resp.data)
            
        else:
           return Response(serializer.errors)

    def put(self, request, id=None, format=None):
        division = get_object_or_404(Divisions, pk=id)
        serializer = self.serializer_class(division, data=request.data)# request.POST y request.GET, request.FILES
        if serializer.is_valid():
            if request.data.get("DivisionName").upper() == division.DivisionName.upper():
                serializer.save()
                return Response(serializer.data)
            else:
                try:
                    oFound = Divisions.objects.get(DivisionName__iexact = request.data.get("DivisionName"),IsHidden=False)
                    # Duplicate
                    return Response(EXITS,status=204)
                except Divisions.DoesNotExist:
                    serializer.save()
                    return Response(serializer.data)
        return Response(serializer.errors)

    def delete(self, request, id=None, format=None):
        division = get_object_or_404(Divisions, pk=id)
        division.IsHidden =True
        division.save()
        serializer = self.serializer_class(division,many=False)
        return Response(serializer.data)


division = Division.as_view()
            
class Season(APIView):
    serializer_class = NVSLOnline_serializer.SeasonSerializer
    def get(self, request, id=None, format=None):
        if id!=None:
            seasons = get_object_or_404(Seasons, pk=id)
            many = False
        else:
            seasons = Seasons.objects.filter(IsHidden = False).order_by('Id').reverse()
            many = True
        response = self.serializer_class(seasons,many=many)
        return Response(response.data)

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)# request.POST y request.GET, request.FILES
        if serializer.is_valid():
            try:
                Seasons.objects.get(SeasonName__iexact = serializer.data['SeasonName'],IsHidden=False)
                # Duplicate
                return Response(EXITS,status=204)
            except Seasons.DoesNotExist:
                season = Seasons(
                    SeasonName = serializer.data['SeasonName'],
                    SeasonStart = datetime.datetime.strptime(serializer.data['SeasonStart'],'%Y-%m-%d').date(),
                    SeasonEnd = datetime.datetime.strptime(serializer.data['SeasonEnd'],'%Y-%m-%d').date(),
                    IsHidden = False
                )
                season.save()
                resp = self.serializer_class(season,many=False)
                return Response(resp.data)
            
        else:
           return Response(serializer.errors)

    def put(self, request, id=None, format=None):
        season = get_object_or_404(Seasons, pk=id)
        serializer = self.serializer_class(season, data=request.data)# request.POST y request.GET, request.FILES
        if serializer.is_valid():
            if request.data.get("SeasonName").upper() == season.SeasonName.upper():
                serializer.save()
                return Response(serializer.data)
            else:
                try:
                    oFound = Seasons.objects.get(SeasonName__iexact = request.data.get("SeasonName"),IsHidden=False)
                    # Duplicate
                    return Response(EXITS,status=204)
                except Seasons.DoesNotExist:
                    serializer.save()
                    return Response(serializer.data)
        return Response(serializer.errors)

    def delete(self, request, id=None, format=None):
        season = get_object_or_404(Seasons, pk=id)
        season.IsHidden =True
        season.save()
        serializer = self.serializer_class(season,many=False)
        return Response(serializer.data)
   

season = Season.as_view()

class SeasonViewSet(viewsets.ViewSet):
    serializer_class = NVSLOnline_serializer.SeasonSerializer
    def inactiveSeason(self, request, format=None):
        seasons = Seasons.objects.filter(IsHidden = False,Active = False)
        response = self.serializer_class(seasons,many=True)
        return Response(response.data)

    def editSeasonActive(self, request, id=None, format=None):
        season = get_object_or_404(Seasons, pk=id)
        season.Active = request.data.get("Active")
        season.save()
        serializer = self.serializer_class(season,many=False)
        return Response(serializer.data)

inactiveSeason = SeasonViewSet.as_view({'get':'inactiveSeason'})
editSeasonActive = SeasonViewSet.as_view({'put':'editSeasonActive'})

class Venue(APIView):
    serializer_class = NVSLOnline_serializer.VenueSerializer
    def get(self, request, id=None, format=None):
        if id!=None:
            venues = get_object_or_404(Venues, pk=id)
            many = False
        else:
            venues = Venues.objects.filter(IsHidden = False).order_by('Id')
            many = True
        response = self.serializer_class(venues,many=many)
        return Response(response.data)

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)# request.POST y request.GET, request.FILES
        if serializer.is_valid():
            try:
                Venues.objects.get(VenueName__iexact = serializer.data['VenueName'],IsHidden=False)
                # Duplicate
                return Response(EXITS,status=204)
            except Venues.DoesNotExist:
                venue = Venues(
                    VenueName = serializer.data['VenueName'],
                    IsHidden = False
                )
                venue.save()
                resp = self.serializer_class(venue,many=False)
                return Response(resp.data)
            
        else:
           return Response(serializer.errors)

    def put(self, request, id=None, format=None):
        venue = get_object_or_404(Venues, pk=id)
        serializer = self.serializer_class(venue, data=request.data)# request.POST y request.GET, request.FILES
        if serializer.is_valid():
            if request.data.get("VenueName").upper() == venue.VenueName.upper():
                serializer.save()
                return Response(serializer.data)
            else:
                try:
                    oFound = Venues.objects.get(VenueName__iexact = request.data.get("VenueName"),IsHidden=False)
                    # Duplicate
                    return Response(EXITS,status=204)
                except Venues.DoesNotExist:
                    serializer.save()
                    return Response(serializer.data)
        return Response(serializer.errors)

    def delete(self, request, id=None, format=None):
        venue = get_object_or_404(Venues, pk=id)
        venue.IsHidden =True
        venue.save()
        serializer = self.serializer_class(venue,many=False)
        return Response(serializer.data)

venue = Venue.as_view()

class Team(APIView):
    serializer_class = NVSLOnline_serializer.TeamSerializer
    def get(self, request, id=None, format=None):
        if id!=None:
            teams = get_object_or_404(Teams, pk=id)
            many = False
        else:
            teams = Teams.objects.filter(IsHidden = False).order_by('Id').reverse()
            many = True
        response = self.serializer_class(teams,many=many)
        return Response(response.data)

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)# request.POST y request.GET, request.FILES
        if serializer.is_valid():
            try:
                Teams.objects.get(TeamName__iexact = serializer.data['TeamName'],DivisionId = serializer.data['DivisionId'],SeasonId = serializer.data['SeasonId'],IsHidden=False)
                # Duplicate
                return Response(EXITS,status=204)
            except Teams.DoesNotExist:
                team = Teams(
                    TeamName = serializer.data['TeamName'],
                    #Division= Divisions.objects.get(Id = request.data['DivisionId']),
                    #Season = Seasons.objects.get(Id = request.data['SeasonId']),
                    DivisionId= get_object_or_404(Divisions, pk= request.data['DivisionId']),
                    SeasonId = get_object_or_404(Seasons, pk= request.data['SeasonId']),
                    IsHidden = False
                )
                team.save()
                resp = self.serializer_class(team,many=False)
                return Response(resp.data)
        else:
           return Response(serializer.errors)

    def put(self, request, id=None, format=None):
        team = get_object_or_404(Teams, pk=id)
        serializer = self.serializer_class(team, data=request.data)# request.POST y request.GET, request.FILES
        if serializer.is_valid():
            if request.data.get("TeamName").upper() == team.TeamName.upper():
                serializer.save()
                return Response(serializer.data)
            else:
                try:
                    oFound = Teams.objects.get(TeamName__iexact = request.data.get("TeamName"),DivisionId = serializer.data['DivisionId'],SeasonId = serializer.data['SeasonId'],IsHidden=False)
                    # Duplicate
                    return Response(EXITS,status=204)
                except Teams.DoesNotExist:
                    serializer.save()
                    return Response(serializer.data)
        return Response(serializer.errors)

    def delete(self, request, id=None, format=None):
        team = get_object_or_404(Teams, pk=id)
        team.IsHidden =True
        team.save()
        serializer = self.serializer_class(team,many=False)
        return Response(serializer.data)

   
team = Team.as_view()

class Player(APIView):
    serializer_class = NVSLOnline_serializer.PlayerSerializer
    def get(self, request, id=None, format=None):
        if id!=None:
            players = get_object_or_404(Players, pk=id)
            many = False
        else:
            players = Players.objects.filter(IsHidden = False).order_by('Id')
            many = True
        response = self.serializer_class(players,many=many)
        return Response(response.data)

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)# request.POST y request.GET, request.FILES
        if serializer.is_valid():
            try:
                Players.objects.get(FirstName__iexact = serializer.data['FirstName'],LastName__iexact = serializer.data['LastName'],IsHidden=False)
                # Duplicate
                return Response(EXITS,status=204)
            except Players.DoesNotExist:
                player = Players(
                    FirstName = serializer.data['FirstName'],
                    LastName = serializer.data['LastName'],
                    TeamId = get_object_or_404(Teams, pk= request.data['TeamId']),
                    IsHidden = False
                )
                player.save()
                resp = self.serializer_class(player,many=False)
                return Response(resp.data)
          
        else:
           return Response(serializer.errors)

    def put(self, request, id=None, format=None):
        players = get_object_or_404(Players, pk=id)
        serializer = self.serializer_class(players, data=request.data)# request.POST y request.GET, request.FILES
        if serializer.is_valid():
            
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

    def delete(self, request, id=None, format=None):
        players = get_object_or_404(Players, pk=id)
        players.IsHidden =True
        players.save()
        serializer = self.serializer_class(players,many=False)
        return Response(serializer.data)
           

   
player = Player.as_view()

class PlayerViewSet(viewsets.ViewSet):
    serializer_class = NVSLOnline_serializer.PlayerSerializer
    def getPlayersByTeamId(self, request, id=None, format=None):
        #players = get_object_or_404(Players, TeamId=id)
        players = Players.objects.filter(TeamId=id,IsHidden = False)
        response = self.serializer_class(players,many=True)
        return Response(response.data)        

getPlayersByTeamId = PlayerViewSet.as_view({'get':'getPlayersByTeamId'})

class Schedule(APIView):
    serializer_class = NVSLOnline_serializer.ScheduleSerializer
    def get(self, request, id=None, format=None):
        if id!=None:
            schedules = get_object_or_404(Schedules, pk=id)
            many = False
        else:
            schedules = Schedules.objects.filter(IsHidden = False).order_by('Id')
            many = True
        response = self.serializer_class(schedules,many=many)
        return Response(response.data)

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)# request.POST y request.GET, request.FILES
        if serializer.is_valid():
            schedule = Schedules(
                SeasonId = Seasons.objects.get(Id = request.data['SeasonId']),
                DivisionId = Divisions.objects.get(Id = request.data['DivisionId']),
                VenueId = Venues.objects.get(Id = request.data['VenueId']),
                Status = serializer.data['Status'],
                #DateTime = serializer.data['DateTime'],
                DateTime = datetime.datetime.strptime(request.data['DateTime'],'%Y-%m-%dT%H:%M:%S.%fZ').date(),
                #DateTime = formats.date_format(serializer.data['DateTime'],"SHORT_DATETIME_FORMAT"),
                HomeTeamId = Teams.objects.get(Id = request.data['HomeTeamId']),
                GoalsHomeTeam = serializer.data['GoalsHomeTeam'],
                AwayTeamId = Teams.objects.get(Id = request.data['AwayTeamId']),
                GoalsAwayTeam = serializer.data['GoalsAwayTeam'],
                IsHidden = False
            )
            schedule.save()
            
            resp = self.serializer_class(schedule,many=False)
            return Response(resp.data)
        else:
           return Response(serializer.errors)

    def delete(self, request, id=None, format=None):
        schedule = get_object_or_404(Schedules, pk=id)
        schedule.IsHidden =True
        schedule.save()
        serializer = self.serializer_class(schedule,many=False)
        return Response(serializer.data)

schedule = Schedule.as_view()

class ScheduleViewSet(viewsets.ViewSet):
    serializer_class = NVSLOnline_serializer.ScheduleSerializer
    def editScheduleScore(self, request, id=None, format=None):
        schedule = get_object_or_404(Schedules, pk=id)
        schedule.GoalsHomeTeam = request.data.get("GoalsHomeTeam")
        schedule.GoalsAwayTeam = request.data.get("GoalsAwayTeam")
        schedule.Status = "Played"
        schedule.save()
        serializer = self.serializer_class(schedule,many=False)
        return Response(serializer.data)

editScheduleScore = ScheduleViewSet.as_view({'put':'editScheduleScore'})

class Standing(APIView):
    serializer_class = NVSLOnline_serializer.TeamSerializer
    def get(self, request, id=None, format=None):
        lstStanding = []
        teams = Teams.objects.filter(IsHidden = False)
        data = serializers.serialize("json", Teams.objects.filter(IsHidden = False))
        
        for team in json.loads(data):
             
            fieldsTeam = team['fields']
            objSeason = serializers.serialize("json", Seasons.objects.filter(Id = fieldsTeam['SeasonId']))
            objDivision = serializers.serialize("json", Divisions.objects.filter(Id = fieldsTeam['DivisionId']))
            
            teamsEnJuego = Schedules.objects.filter(Q(HomeTeamId = team['pk']) | Q(AwayTeamId = team['pk']), IsHidden = False)
                        
            standing = {}
            standing["SeasonId"] = fieldsTeam['SeasonId']
            standing["Season"] = json.loads(objSeason)[0]['fields']
            standing["DivisionId"] = fieldsTeam['DivisionId']
            standing["Division"] = json.loads(objDivision)[0]['fields']

            standing["TeamName"] = fieldsTeam['TeamName']
            standing["Wins"] = 0
            standing["Losses"] = 0
            standing["Ties"] = 0
            standing["Points"] = 0
            standing["GoalsFor"] = 0
            standing["GoalsAgainst"] = 0

            for teamEnJuego in teamsEnJuego:
                #pprint("test" + str(team['pk']) + ":" + str(teamEnJuego.HomeTeamId.Id))
                vrGoalsHomeTeam = teamEnJuego.GoalsHomeTeam
                vrGoalsAwayTeam = teamEnJuego.GoalsAwayTeam
                if teamEnJuego.GoalsHomeTeam is None:
                    vrGoalsHomeTeam = 0

                if teamEnJuego.GoalsAwayTeam is None:
                    vrGoalsAwayTeam = 0

                if team['pk'] == teamEnJuego.HomeTeamId.Id:
                    
                    standing["GoalsFor"] = standing["GoalsFor"] + vrGoalsHomeTeam
                    standing["GoalsAgainst"] = standing["GoalsAgainst"] + vrGoalsAwayTeam
                    #pprint("forA" + str(standing["GoalsFor"]))

                    if vrGoalsHomeTeam > vrGoalsAwayTeam:
                        standing["Wins"] += 1
                        standing["Points"] += 3
                    
                    if vrGoalsHomeTeam < vrGoalsAwayTeam:
                        standing["Losses"] += 1
                   
                    if vrGoalsHomeTeam == vrGoalsAwayTeam and teamEnJuego.GoalsHomeTeam != None:
                        standing["Ties"] += 1
                        standing["Points"] += 1
                else:
                    standing["GoalsFor"] = standing["GoalsFor"] + vrGoalsAwayTeam
                    standing["GoalsAgainst"] = standing["GoalsAgainst"] + vrGoalsHomeTeam
                    #pprint("forB" + str(standing["GoalsFor"]))

                    if vrGoalsAwayTeam > vrGoalsHomeTeam:
                        standing["Wins"] += 1
                        standing["Points"] += 3
                    if vrGoalsAwayTeam < vrGoalsHomeTeam:
                        standing["Losses"] += 1
                    if vrGoalsAwayTeam == vrGoalsHomeTeam and teamEnJuego.GoalsHomeTeam != None:
                        standing["Ties"] += 1
                        standing["Points"] += 1
                        
            #pprint(standing["GoalsFor"])
            #pprint(standing["GoalsAgainst"])
            standing["Differential"] = standing["GoalsFor"] - standing["GoalsAgainst"]
            lstStanding.append(standing.copy())
  
        return Response(lstStanding)

standing = Standing.as_view()

###################################### CONFIGURATION #########################################

class New(APIView):
    serializer_class = NVSLOnline_serializer.NewSerializer
    def get(self, request, id=None, format=None):
        if id!=None:
            news = get_object_or_404(News, pk=id)
            many = False
        else:
            news = News.objects.filter(IsHidden = False).order_by('modified').reverse()
            many = True
        response = self.serializer_class(news,many=many)
        return Response(response.data)

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)# request.POST y request.GET, request.FILES
        if serializer.is_valid():
            
            serializer.save()
            resp = self.serializer_class(serializer,many=False)
            return Response(resp.data)
            
        else:
           return Response(serializer.errors)

    def put(self, request, id=None, format=None):
        news = get_object_or_404(News, pk=id)
        serializer = self.serializer_class(news, data=request.data)# request.POST y request.GET, request.FILES
        if serializer.is_valid():
            
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

    def delete(self, request, id=None, format=None):
        news = get_object_or_404(News, pk=id)
        news.IsHidden =True
        news.save()
        serializer = self.serializer_class(news,many=False)
        return Response(serializer.data)
   

new = New.as_view()

class Contact(APIView):
    serializer_class = NVSLOnline_serializer.ContactSerializer
    def get(self, request, id=None, format=None):
        if id!=None:
            contacts = get_object_or_404(Contacts, pk=id)
            many = False
        else:
            contacts = Contacts.objects.filter(IsHidden = False).order_by('Id')
            many = True
        response = self.serializer_class(contacts,many=many)
        return Response(response.data)

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)# request.POST y request.GET, request.FILES
        if serializer.is_valid():
            contact = Contacts(
                yourName = serializer.data['yourName'],
                email = serializer.data['email'],
                message = serializer.data['message'],
                IsHidden = False,
                requestSubject = serializer.data['requestSubject'],
                modifiedBy = serializer.data['modifiedBy'],
                modifiedByfullName = serializer.data['modifiedByfullName']
            )
            
            contact.save()
            resp = self.serializer_class(contact,many=False)
            return Response(resp.data)
            
        else:
           return Response(serializer.errors)

    def put(self, request, id=None, format=None):
        contacts = get_object_or_404(Contacts, pk=id)
        serializer = self.serializer_class(contacts, data=request.data)# request.POST y request.GET, request.FILES
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

    def delete(self, request, id=None, format=None):
        contacts = get_object_or_404(Contacts, pk=id)
        contacts.IsHidden =True
        contacts.save()
        serializer = self.serializer_class(contacts,many=False)
        return Response(serializer.data)
   

contact = Contact.as_view()

