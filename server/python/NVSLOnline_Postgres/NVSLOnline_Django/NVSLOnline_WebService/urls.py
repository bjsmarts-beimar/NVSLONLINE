#from django.conf.urls.defaults import patterns.url

#urlpatters = patterns('NVSLOnline.WebServices.views',
#    url(r'^api/Divisions/$','wsDivisions_view',name="get_list_divisions"),
   # url(r'^admin/', admin.site.urls),
#)

from django.conf.urls import url, include
from django.contrib import admin
from NVSLOnline_WebService import views

urlpatterns = [
    url(r'^api/divisions/$', views.wsDivisions_view, name="get_list_divisions"),
    url(r'^api/teams/$', views.wsTeams, name="get_list_teams"),
    #url(r'^admin/', admin.site.urls),
    #url(r'^', include('NVSLOnline_WebService.urls')),
]
