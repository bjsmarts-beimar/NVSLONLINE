from django.conf.urls import url
from NVSLOnline_WebService.views import HolaMundo,Division,Season,Venue,Team,Schedule
#from NVSLOnline_WebService import views 

urlpatterns = [
    #url(r'^admin/', admin.site.urls),
    #url(r'^hola_mundo/$', 'hola_mundo'),
    ################################## DIVISION ##################################
    #url(r'^api/hola_mundo/$', HolaMundo.as_view(), name='hola_mundo'),
    url(r'^api/divisions/$', Division.as_view(), name='getDivisions'),
    url(r'^api/divisions/(?P<id>\d+)$', Division.as_view(), name='getDivisions'),

    ################################## SEASONS ##################################
    url(r'^api/seasons/$', Season.as_view(), name='get_season'),




    ################################## VENUES ##################################



    ################################## TEAMS ##################################
    url(r'^api/teams/$', Team.as_view(), name='get_team'),


    ################################## SCHEDULES ##################################
]