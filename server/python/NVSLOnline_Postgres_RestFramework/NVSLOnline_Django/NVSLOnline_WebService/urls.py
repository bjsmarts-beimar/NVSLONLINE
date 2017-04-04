from django.conf.urls import url
from NVSLOnline_WebService.views import HolaMundo,Division
#from NVSLOnline_WebService import views 

urlpatterns = [
    #url(r'^admin/', admin.site.urls),
    #url(r'^hola_mundo/$', 'hola_mundo'),
    url(r'^hola_mundo/$', HolaMundo.as_view(), name='hola_mundo'),
    url(r'^divisions/$', Division.as_view(), name='getDivisions'),
    url(r'^divisions/(?P<id>\d+)$', Division.as_view(), name='getDivisions'),
]