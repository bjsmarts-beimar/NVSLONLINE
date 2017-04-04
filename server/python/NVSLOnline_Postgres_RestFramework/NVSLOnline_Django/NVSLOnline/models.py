#from __future__ import unicode_literals

from django.db import models

# Create your models here.
class Divisions(models.Model):
    #Id = models.UUIDField(primary_key=True,default=uuid.uuid4,editable=False)
    Id = models.AutoField(primary_key=True)
    DivisionName = models.TextField()
    IsHidden = models.BooleanField(default=False)
    
    def __unicode__(self):
        return u'{0} - {1}'.format(self.Divisions)