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
            url: webUrl +  'api/divisions/?format=json'
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

 this.deleteDivision = function (webUrl,objDivision) {
        return $http({
            method: 'DELETE',
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

    this.editTeam = function (webUrl,objTeam) {
        return $http({
            method: 'PUT',
            url: webUrl +  'api/teams/' + objTeam.Id,
            //withCredentials: true,
           data: objTeam
        });

    };

    this.deleteTeam = function (webUrl,objTeam) {
        return $http({
            method: 'DELETE',
            url: webUrl +  'api/teams/' + objTeam.Id,
            //withCredentials: true,
           data: objTeam
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

    this.editSeason = function (webUrl,objSeason) {
        return $http({
            method: 'PUT',
            url: webUrl +  'api/seasons/' + objSeason.Id,
            //withCredentials: true,
           data: objSeason
        });

    };

    this.deleteSeason = function (webUrl,objSeason) {
        return $http({
            method: 'DELETE',
            url: webUrl +  'api/seasons/' + objSeason.Id,
            //withCredentials: true,
           data: objSeason
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

    this.addVenue = function (webUrl, objVenue) {
        return $http({
            method: 'POST',
            url: webUrl +  'api/venues',
            data: objVenue,
            //withCredentials: true,
        }).then(function successCallback(response){
            console.log(response);
        },function errorCallback(response){
            console.log(response);
        });
    };

    this.editVenue = function (webUrl,objVenue) {
        return $http({
            method: 'PUT',
            url: webUrl +  'api/venues/' + objVenue.Id,
            //withCredentials: true,
           data: objVenue
        });

    };

    this.deleteVenue = function (webUrl,objVenue) {
        return $http({
            method: 'DELETE',
            url: webUrl +  'api/venues/' + objVenue.Id,
            //withCredentials: true,
           data: objVenue
        });

    };

    /********************************* Schedules *******************************/

    this.getSchedules = function (webUrl) {
        return $http({
            method: 'GET',
            //withCredentials: true,
            data: 'json',
            url: webUrl +  'api/schedules'
        }).then(function successCallback(response){
            console.log(response);
        },function errorCallback(response){
            console.log(response);
        });
    };

    this.addSchedule = function (webUrl, objSchedule) {
        return $http({
            method: 'POST',
            url: webUrl +  'api/schedules',
            data: objSchedule,
            //withCredentials: true,
        }).then(function successCallback(response){
            console.log(response);
        },function errorCallback(response){
            console.log(response);
        });
    };

    this.editScore = function (webUrl,objSchedule) {
        return $http({
            method: 'PUT',
            url: webUrl +  'api/schedules/' + objSchedule.Id,
            //withCredentials: true,
           data: objSchedule
        }).then(function successCallback(response){
            console.log(response);
        },function errorCallback(response){
            console.log(response);
        });
    };

    this.deleteVenue = function (webUrl,objVenue) {
        return $http({
            method: 'DELETE',
            url: webUrl +  'api/venues/' + objVenue.Id,
            //withCredentials: true,
           data: objVenue
        }).then(function successCallback(response){
            console.log(response);
        },function errorCallback(response){
            console.log(response);
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

    /*********************************** News **********************************/

    this.getNews = function (webUrl) {
        return $http({
            method: 'GET',
            //withCredentials: true,
            data: 'json',
            url: webUrl +  'api/news'
        });
    };

    this.addNew = function (webUrl, objNew) {
        return $http({
            method: 'POST',
            url: webUrl +  'api/news',
            data: objNew,
            //withCredentials: true,
        }).then(function successCallback(response){
            console.log(response);
        },function errorCallback(response){
            console.log(response);
        });
    };

    this.editNew = function (webUrl,objNew) {
        return $http({
            method: 'PUT',
            url: webUrl +  'api/news/' + objNew.Id,
            //withCredentials: true,
           data: objNew
        });

    };

    this.deleteNew = function (webUrl,objNew) {
        return $http({
            method: 'DELETE',
            url: webUrl +  'api/news/' + objNew.Id,
            //withCredentials: true,
           data: objNew
        });

    };

    /*********************************** Players **********************************/

    this.getPlayers = function (webUrl) {
        return $http({
            method: 'GET',
            //withCredentials: true,
            data: 'json',
            url: webUrl +  'api/players'
        });
    };

    this.addPlayer = function (webUrl, objPlayer) {
        return $http({
            method: 'POST',
            url: webUrl +  'api/players',
            data: objPlayer,
            //withCredentials: true,
        }).then(function successCallback(response){
            console.log(response);
        },function errorCallback(response){
            console.log(response);
        });
    };

    this.editPlayer = function (webUrl,objPlayer) {
        return $http({
            method: 'PUT',
            url: webUrl +  'api/players/' + objPlayer.Id,
            //withCredentials: true,
           data: objPlayer
        });

    };

    this.deletePlayer = function (webUrl,objPlayer) {
        return $http({
            method: 'DELETE',
            url: webUrl +  'api/players/' + objPlayer.Id,
            //withCredentials: true,
           data: objPlayer
        });

    };




  });

