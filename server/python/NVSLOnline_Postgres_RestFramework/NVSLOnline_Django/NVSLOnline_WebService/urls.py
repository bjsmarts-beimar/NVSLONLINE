from django.conf.urls import url
from NVSLOnline_WebService.views import Division,Season,Venue,Team,Schedule,DivisionViewset
#from NVSLOnline_WebService import views 

urlpatterns = [
    #url(r'^admin/', admin.site.urls),
    ################################## DIVISION ##################################
    url(r'^api/divisions/$', Division.as_view(), name='getDivisions'),
    #url(r'^api/divisions/$', DivisionViewset.as_view({'get':'list'}), name='getDivisions'),
    url(r'^api/divisions/(?P<id>\d+)$', Division.as_view(), name='getDivisionsId'),

    ################################## SEASONS ##################################
    url(r'^api/seasons/$', Season.as_view(), name='get_season'),
    url(r'^api/seasons/(?P<id>\d+)$', Season.as_view(), name='getSeasonsId'),

    ################################## VENUES ##################################

    url(r'^api/venues/$', Venue.as_view(), name='get_venues'),
    url(r'^api/venues/(?P<id>\d+)$', Venue.as_view(), name='getVenuesId'),


    ################################## TEAMS ##################################
    url(r'^api/teams/$', Team.as_view(), name='get_team'),
    url(r'^api/teams/(?P<id>\d+)$', Team.as_view(), name='getTeamId'),


    ################################## SCHEDULES ##################################
    url(r'^api/schedules/$', Schedule.as_view(), name='get_schedule'),
    url(r'^api/schedules/(?P<id>\d+)$', Schedule.as_view(), name='getScheduleId'),
]