from NVSLOnline.models import Divisions,Seasons,Venues,Teams,Schedules,Players,News,Contacts
from rest_framework.serializers import ModelSerializer
from rest_framework import serializers

class DivisionSerializer(ModelSerializer):
    class Meta:
        model = Divisions
        fields = ('Id','DivisionName','IsHidden')
        #read_only_fields = ('Id')

class SeasonSerializer(ModelSerializer):
    SeasonStart = serializers.DateField()
    #SeasonStart = serializers.DateTimeField()
    #SeasonEnd = serializers.DateField(input_formats=(['%m/%d/%Y %I:%M %p','iso-8601']))
    SeasonEnd = serializers.DateField()
    class Meta:
        model = Seasons
        fields = ('Id','SeasonName','Active','IsHidden','SeasonStart','SeasonEnd')
        #read_only_fields = ('Id')

class VenueSerializer(ModelSerializer):
    class Meta:
        model = Venues
        fields = ('Id','VenueName','IsHidden')
        #read_only_fields = ('Id')

class TeamSerializer(ModelSerializer):
    
    Division = DivisionSerializer(source='DivisionId',read_only=True)
    Season = SeasonSerializer(source='SeasonId',read_only=True)
    class Meta:
        model = Teams
        fields = ('Id','TeamName','IsHidden','DivisionId','Division','SeasonId','Season') 

class PlayerSerializer(ModelSerializer):
    
    Team = TeamSerializer(source='TeamId',read_only=True)
    class Meta:
        model = Players
        fields = ('Id','FirstName','LastName','IsHidden','TeamId','Team') 

class ScheduleSerializer(ModelSerializer):
    Division = DivisionSerializer(source='DivisionId',read_only=True)
    Season = SeasonSerializer(source='SeasonId',read_only=True)
    Venue = VenueSerializer(source='VenueId',read_only=True)
    HomeTeam = TeamSerializer(source='HomeTeamId',read_only=True)
    AwayTeam = TeamSerializer(source='AwayTeamId',read_only=True)

    class Meta:
        model = Schedules
        fields = ('Id', 'SeasonId', 'Season','DivisionId', 'Division' ,'VenueId','Venue','Status','DateTime','HomeTeamId','HomeTeam','GoalsHomeTeam','AwayTeamId','AwayTeam','GoalsAwayTeam','IsHidden')
        #read_only_fields = ('Id')

######################################## CONFIGURATION #############################################
class ContactSerializer(ModelSerializer):
   
    class Meta:
        model = Contacts
        fields = ('Id','yourName','email','message','IsHidden','requestSubject','created','modifiedBy','modifiedByfullName','modified')
        #read_only_fields = ('Id')

class NewSerializer(ModelSerializer):
    class Meta:
        model = News
        fields = ('Id','title','description','IsHidden','created','modifiedBy','modifiedByfullName','modified')
        #read_only_fields = ('Id')
