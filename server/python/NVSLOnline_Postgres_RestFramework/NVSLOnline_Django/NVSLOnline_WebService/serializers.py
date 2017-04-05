from NVSLOnline.models import Divisions,Seasons,Venues,Teams,Schedules
from rest_framework.serializers import ModelSerializer

class DivisionSerializer(ModelSerializer):
    class Meta:
        model = Divisions
        fields = ('Id','DivisionName','IsHidden')
        #read_only_fields = ('Id')

class SeasonSerializer(ModelSerializer):
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
    class Meta:
        model = Teams
        fields = ('Id','TeamName','IsHidden','DivisionId','SeasonId')
        #read_only_fields = ('Id')

class ScheduleSerializer(ModelSerializer):
    class Meta:
        model = Schedules
        fields = ('Id','SeasonId','DivisionId','VenueId','Status','DateTime','HomeTeamId','GoalsHomeTeam','AwayTeamId','GoalsAwayTeam','IsHidden')
        #read_only_fields = ('Id')