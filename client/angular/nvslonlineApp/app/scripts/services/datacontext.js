'use strict';

/**
 * @ngdoc service
 * @name nvslonlineAppApp.datacontext
 * @description
 * # datacontext
 * Service in the nvslonlineAppApp.
 */
angular.module('nvslonlineAppApp')
  .service('datacontext', function ($http) {
    

    /**************** Division ************************/
    this.getDivisions = function (webUrl) {
        return $http({
            method: 'GET',
            //withCredentials: true,
            data: 'json',
            url: webUrl +  'api/divisions'
        });
    };

 this.addDivision = function (webUrl, objDivision) {
    console.log($.param(objDivision));
        return $http({
            method: 'POST',
            url: webUrl +  'api/divisions',
            data: $.param(objDivision),
            //withCredentials: true,
            headers:{"Content-Type":"application/x-www-form-urlencoded; charset=utf-8"}
        });
    };

    /*this.editDivision = function (webUrl,objDivision) {
        console.log($.param(objDivision));
        return $http({
            method: 'PUT',
            url: webUrl +  'api/divisions',
            //withCredentials: true,
            data: $.param(objDivision),
            headers:{"Content-Type":"application/x-www-form-urlencoded; charset=utf-8"}
        });
    };*/
this.editDivision = function (webUrl,objDivision) {
        console.log($.param(objDivision));
        return $http({
            method: 'PUT',
            url: webUrl +  'api/divisions/3',
            //withCredentials: true,
            data: $.param(objDivision),
            headers:{"Content-Type":"application/x-www-form-urlencoded; charset=utf-8"}
        });
    /*this.editDivision = function (webUrl,objDivision) {
        console.log($.param(objDivision));
        var TData = objDivision;
        var uri = webUrl +  'api/divisions';
        return $http.put(uri,TData);

*/
    };
    /****************** Team *************************/

    this.getTeams = function (webUrl) {
        return $http({
            method: 'GET',
            //withCredentials: true,
            data: 'json',
            url: webUrl +  'api/teams'
        });
    };

    this.getSeasons = function (webUrl) {
        return $http({
            method: 'GET',
            //withCredentials: true,
            data: 'json',
            url: webUrl +  'api/seasons'
        });
    };

    this.getSchedules = function (webUrl) {
        return $http({
            method: 'GET',
            //withCredentials: true,
            data: 'json',
            url: webUrl +  'api/schedules'
        });
    };

    this.getVenues = function (webUrl) {
        return $http({
            method: 'GET',
            //withCredentials: true,
            data: 'json',
            url: webUrl +  'api/venues'
        });
    };

  });

