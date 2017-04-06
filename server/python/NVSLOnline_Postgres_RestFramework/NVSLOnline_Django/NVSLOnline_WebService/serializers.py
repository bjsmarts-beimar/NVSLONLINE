from NVSLOnline.models import Divisions,Seasons,Venues,Teams,Schedules
from rest_framework.serializers import ModelSerializer
from rest_framework import serializers

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
    DivisionId = DivisionSerializer(many=False, read_only=True)
    SeasonId = SeasonSerializer(many=False, read_only=True)
    #DivisionId = serializers.PrimaryKeyRelatedField(many=False,read_only=True)
    #SeasonId = serializers.PrimaryKeyRelatedField(many=False,read_only=True)
    class Meta:
        model = Teams
        fields = ('Id','TeamName','IsHidden','DivisionId','SeasonId') 


class ScheduleSerializer(ModelSerializer):
    DivisionId = DivisionSerializer(many=False, read_only=True)
    SeasonId = SeasonSerializer(many=False, read_only=True)
    VenueId = VenueSerializer(many=False, read_only=True)
    HomeTeamId = TeamSerializer(many=False, read_only=True)
    AwayTeamId = TeamSerializer(many=False, read_only=True)

    class Meta:
        model = Schedules
        fields = ('Id','SeasonId','DivisionId','VenueId','Status','DateTime','HomeTeamId','GoalsHomeTeam','AwayTeamId','GoalsAwayTeam','IsHidden')
        #read_only_fields = ('Id')