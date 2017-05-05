from django.db import models

# Create your models here.
class Divisions(models.Model):
    Id = models.AutoField(primary_key=True)
    DivisionName = models.TextField()
    IsHidden = models.BooleanField(default=False)
    
    def __unicode__(self):
       return u'{0} - {1}'.format(self.DivisionName, self.Id)

class Seasons(models.Model):
    Id = models.AutoField(primary_key=True)
    SeasonName = models.TextField()
    Active = models.BooleanField(default=False)
    IsHidden = models.BooleanField(default=False)
    SeasonStart = models.DateField(blank=True, null=True)
    SeasonEnd = models.DateField(blank=True, null=True)
    #SeasonEnd = models.DateTimeField(auto_now_add=True)

    def __unicode__(self):
       return u'{0} - {1}'.format(self.SeasonName, self.Id)

class Venues(models.Model):
    Id = models.AutoField(primary_key=True)
    VenueName = models.TextField()
    IsHidden = models.BooleanField(default=False)

    def __unicode__(self):
       return u'{0} - {1}'.format(self.VenueName, self.Id)

class Teams(models.Model):
    Id = models.AutoField(primary_key=True)
    TeamName = models.TextField()
    IsHidden = models.BooleanField(default=False)
    DivisionId = models.ForeignKey(Divisions, db_column = 'DivisionId', null=True)
    SeasonId = models.ForeignKey(Seasons,db_column = 'SeasonId', null=True)

    def __unicode__(self):
       return u'{0} - {1}'.format(self.TeamName, self.Id)

class Players(models.Model):
    Id = models.AutoField(primary_key=True)
    FirstName = models.TextField()
    LastName = models.TextField()
    IsHidden = models.BooleanField(default=False)
    TeamId = models.ForeignKey(Teams, db_column = 'TeamId', null=True)

    def __unicode__(self):
           return u'{0} - {1}'.format(self.FirstName, self.Id)

class Schedules(models.Model):
    Id = models.AutoField(primary_key=True)
    DivisionId = models.ForeignKey(Divisions,db_column = 'DivisionId',  null=True)
    SeasonId = models.ForeignKey(Seasons,db_column = 'SeasonId', null=True)
    VenueId = models.ForeignKey(Venues,db_column = 'VenueId', null=True)
    Status = models.TextField()
    DateTime = models.DateTimeField(auto_now_add=True)
    HomeTeamId = models.ForeignKey(Teams, related_name='HomeTeam',db_column = 'HomeTeamId', null=True)
    GoalsHomeTeam = models.IntegerField(blank=True, null=True)
    AwayTeamId = models.ForeignKey(Teams, related_name='AwayTeam',db_column = 'AwayTeamId', null=True)
    GoalsAwayTeam = models.IntegerField(blank=True, null=True)
    IsHidden = models.BooleanField(default=False)

    def __unicode__(self):
       return u'{0} - {1}'.format(self.Status, self.Id )

######################################### CONFIGURACION #############################################

class News(models.Model):
    Id = models.AutoField(primary_key=True)
    title = models.TextField()
    description = models.TextField()
    IsHidden = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)
    modifiedBy = models.TextField()
    modifiedByfullName = models.TextField()
    modified = models.DateTimeField(auto_now_add=True)

class Contacts(models.Model):
    Id = models.AutoField(primary_key=True)
    yourName = models.TextField()
    email = models.TextField()
    message = models.TextField()
    
    IsHidden = models.BooleanField(default=False)
    requestSubject = models.IntegerField()
    created = models.DateTimeField(auto_now_add=True)
    modifiedBy = models.TextField()
    modifiedByfullName = models.TextField()
    modified = models.DateTimeField(auto_now_add=True)
