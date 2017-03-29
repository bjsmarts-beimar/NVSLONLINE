#from __future__ import unicode_literals
import uuid
from django.db import models

# Create your models here.
class Divisions(models.Model):
    Id = models.UUIDField(primary_key=True,default=uuid.uuid4,editable=False)
    DivisionName = models.TextField()
    IsHidden = models.BooleanField(default=False)

class Seasons(models.Model):
    Id = models.UUIDField(primary_key=True,default=uuid.uuid4,editable=False)
    SeasonName = models.TextField()
    Active = models.BooleanField(default=False)
    IsHidden = models.BooleanField(default=False)
    SeasonStart = models.DateTimeField(auto_now_add=True)
    SeasonEnd = models.DateTimeField(auto_now_add=True)

class Venues(models.Model):
    Id = models.UUIDField(primary_key=True,default=uuid.uuid4,editable=False)
    VenueName = models.TextField()
    IsHidden = models.BooleanField(default=False)

class Teams(models.Model):
    Id = models.UUIDField(primary_key=True,default=uuid.uuid4,editable=False)
    TeamName = models.TextField()
    IsHidden = models.BooleanField(default=False)
    DivisionId = models.ForeignKey(Divisions)
    SeasonId = models.ForeignKey(Seasons)

class Schedules(models.Model):
    Id = models.UUIDField(primary_key=True,default=uuid.uuid4,editable=False)
    DivisionId = models.ForeignKey(Divisions)
    SeasonId = models.ForeignKey(Seasons)
    VenueId = models.ForeignKey(Venues)
    Status = models.TextField()
    DateTime = models.DateTimeField(auto_now_add=True)
    HomeTeamId = models.ForeignKey(Teams, related_name='H')
    GoalsHomeTeam = models.IntegerField()
    AwayTeamId = models.ForeignKey(Teams)
    GoalsAwayTeam = models.IntegerField()
    IsHidden = models.BooleanField(default=False)