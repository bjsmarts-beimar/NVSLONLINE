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
    

    /********************************* Division *******************************/
    this.getDivisions = function (webUrl) {
        return $http({
            method: 'GET',
            //withCredentials: true,
            data: 'json',
            url: webUrl +  'api/divisions'
        });
    };

 this.addDivision = function (webUrl, objDivision) {
        return $http({
            method: 'POST',
            url: webUrl +  'api/divisions',
            data: objDivision
        });
    };

this.editDivision = function (webUrl,objDivision) {
        return $http({
            method: 'PUT',
            url: webUrl +  'api/divisions/' + objDivision.Id,
            //withCredentials: true,
           data: objDivision
        });

    };
    /*********************************** Team *********************************/

    this.getTeams = function (webUrl) {
        return $http({
            method: 'GET',
            //withCredentials: true,
            data: 'json',
            url: webUrl +  'api/teams'
        });
    };

    this.addTeam = function (webUrl, objTeam) {
        return $http({
            method: 'POST',
            url: webUrl +  'api/teams',
            data: objTeam,
            //withCredentials: true,
        });
    };


    /********************************* Seasons *******************************/
    this.getSeasons = function (webUrl) {
        return $http({
            method: 'GET',
            //withCredentials: true,
            data: 'json',
            url: webUrl +  'api/seasons'
        });
    };

    this.getSeasonNoActive = function (webUrl) {
        return $http({
            method: 'GET',
            //withCredentials: true,
            data: 'json',
            url: webUrl +  'api/seasons/inactive'
        });
    };

    this.addSeason = function (webUrl, objSeason) {
        return $http({
            method: 'POST',
            url: webUrl +  'api/seasons',
            data: objSeason,
            //withCredentials: true,
        }).then(function successCallback(response){
            console.log(response);
        },function errorCallback(response){
            console.log(response);
        });
    };

    /********************************* Venues *******************************/
    this.getVenues = function (webUrl) {
        return $http({
            method: 'GET',
            //withCredentials: true,
            data: 'json',
            url: webUrl +  'api/venues'
        });
    };

    /********************************* Schedules *******************************/

    this.getSchedules = function (webUrl) {
        return $http({
            method: 'GET',
            //withCredentials: true,
            data: 'json',
            url: webUrl +  'api/schedules'
        });
    };

    /********************************* Standings *******************************/

    this.getStandings = function (webUrl) {
        return $http({
            method: 'GET',
            //withCredentials: true,
            data: 'json',
            url: webUrl +  'api/standings'
        });
    };

    

  });

