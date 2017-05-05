
from NVSLOnline.models import Divisions,Seasons,Venues,Teams,Schedules,Players,News,Contacts
from django.contrib.auth.models import User 
from django.db.models import Q 

from pprint import pprint

from django.contrib.auth import authenticate
from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView

from NVSLOnline_WebService import serializers as NVSLOnline_serializer

from django.core import serializers
import datetime,json
# Create your views here.

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
            seasons = Seasons.objects.filter(IsHidden = False).order_by('Id')
            many = True
        response = self.serializer_class(seasons,many=many)
        return Response(response.data)

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)# request.POST y request.GET, request.FILES
        if serializer.is_valid():
            season = Seasons(
                SeasonName = serializer.data['SeasonName'],
                SeasonStart = datetime.datetime.strptime(serializer.data['SeasonStart'],'%Y-%m-%d').date(),
                SeasonEnd = datetime.datetime.strptime(serializer.data['SeasonEnd'],'%Y-%m-%d').date(),
                IsHidden = False
            )
            print(serializer.data)
            season.save()
            resp = self.serializer_class(season,many=False)
            return Response(resp.data)
            
        else:
           return Response(serializer.errors)

    def put(self, request, id=None, format=None):
        season = get_object_or_404(Seasons, pk=id)
        serializer = self.serializer_class(season, data=request.data)# request.POST y request.GET, request.FILES
        if serializer.is_valid():
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
            teams = Teams.objects.filter(IsHidden = False).order_by('Id')
            many = True
        response = self.serializer_class(teams,many=many)
        return Response(response.data)

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)# request.POST y request.GET, request.FILES
        if serializer.is_valid():
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

schedule = Schedule.as_view()

class ScheduleViewSet(viewsets.ViewSet):
    serializer_class = NVSLOnline_serializer.ScheduleSerializer
    def editScheduleScore(self, request, id=None, format=None):
        schedule = get_object_or_404(Schedules, pk=id)
        schedule.GoalsHomeTeam = request.data.get("GoalsHomeTeam")
        schedule.GoalsAwayTeam = request.data.get("GoalsAwayTeam")
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
            
            teamsEnJuego = Schedules.objects.filter(Q(HomeTeamId = team['pk']) | Q(AwayTeamId = team['pk']))
                        
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
                if team['pk'] == teamEnJuego.HomeTeamId.Id:
                    standing["GoalsFor"] += teamEnJuego.GoalsHomeTeam;
                    standing["GoalsAgainst"] += teamEnJuego.GoalsAwayTeam;
                    #pprint("forA" + str(standing["GoalsFor"]))

                    if teamEnJuego.GoalsHomeTeam > teamEnJuego.GoalsAwayTeam:
                        standing["Wins"] += 1;
                        standing["Points"] += 3;
                    
                    if teamEnJuego.GoalsHomeTeam < teamEnJuego.GoalsAwayTeam:
                        standing["Losses"] += 1;
                        
                    if teamEnJuego.GoalsHomeTeam == teamEnJuego.GoalsAwayTeam and teamEnJuego.GoalsHomeTeam != null:
                        standing["Ties"] += 1;
                        standing["Points"] += 1;
                else:
                    standing["GoalsFor"] += teamEnJuego.GoalsAwayTeam;
                    standing["GoalsAgainst"] += teamEnJuego.GoalsHomeTeam;
                    #pprint("forB" + str(standing["GoalsFor"]))

                    if teamEnJuego.GoalsAwayTeam > teamEnJuego.GoalsHomeTeam:
                        standing["Wins"] += 1;
                        standing["Points"] += 3;
                    if teamEnJuego.GoalsAwayTeam < teamEnJuego.GoalsHomeTeam:
                        standing["Losses"] += 1;
                    if teamEnJuego.GoalsAwayTeam == teamEnJuego.GoalsHomeTeam and teamEnJuego.GoalsHomeTeam != null:
                        standing["Ties"] += 1;
                        standing["Points"] += 1;
                        
            #pprint(standing["GoalsFor"])
            #pprint(standing["GoalsAgainst"])
            standing["Differential"] = standing["GoalsFor"] - standing["GoalsAgainst"];
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
            
            serializer.save()
            resp = self.serializer_class(serializer,many=False)
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

class Users(APIView):
    serializer_class = NVSLOnline_serializer.UserSerializer

    def post(self, request, format=None):
        
        serializer = self.serializer_class(data=request.data)# request.POST y request.GET, request.FILES
        if serializer.is_valid():
                        
            username = serializer.data['username']
            email = serializer.data['email']
            password = serializer.data['password'] #generate_password_hash(password)
            first_name = serializer.data['first_name']
            last_name = serializer.data['last_name']
            
            user = User.objects.create_user(username,email,password)
            user.first_name = first_name
            user.last_name = last_name

            user.save()
            resp = self.serializer_class(user,many=False)
            return Response(resp.data)
            
        else:
           return Response(serializer.errors)
     
register = Users.as_view()

class UsersViewSet(viewsets.ViewSet):
    def authenticateUser(self, request, format=None):
        print(request.data)
        try:
            username = request.data.get("username")
            password = request.data.get("password")
                        
            user = authenticate(username = username, password = password)

            if user is not None:
                return Response(True)
            else:
                email = request.data.get("email")
                emailUsername = User.objects.get(email=email).username #verifica si el username ingresado es email
                user = authenticate(username = emailUsername, password = password)

                if user is not None:
                    return Response(True)
                else:
                    return Response(False)
        except Exception as e:
            return Response(False)

    def changePassword(self, request, id=None, format=None):
        serializer = self.serializer_class(data=request.data)# request.POST y request.GET, request.FILES
        if serializer.is_valid():
            u = User.objects.get(username = serializer.data['username'])    
            u.set_password(serializer.data['password'])                    
            u.save()

            resp = self.serializer_class(u,many=False)
            return Response(resp.data)
              
        else:
           return Response(serializer.errors)

authenticateUser = UsersViewSet.as_view({'post':'authenticateUser'})
changePassword = UsersViewSet.as_view({'post':'changePassword'})
