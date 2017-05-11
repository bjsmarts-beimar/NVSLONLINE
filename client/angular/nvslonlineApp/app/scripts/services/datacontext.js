'use strict';

/**
 * @ngdoc service
 * @name nvslonlineAppApp.datacontext
 * @description
 * # datacontext
 * Service in the nvslonlineAppApp.
 */
angular.module('nvslonlineAppApp')
  .service('datacontext', function ($http,common) {
    

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

    this.getTeamById = function (webUrl,Id) {
        return $http({
            method: 'GET',
            //withCredentials: true,
            data: 'json',
            url: webUrl +  'api/teams/' + Id
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

    this.editSeasonActive = function (webUrl,objSeason) {
        return $http({
            method: 'PUT',
            url: webUrl +  'api/seasons/seasonActive/' + objSeason.Id,
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
            url: webUrl +  'api/schedules/scheduleScore/' + objSchedule.Id,
            //withCredentials: true,
           data: objSchedule
        }).then(function successCallback(response){
            console.log(response);
        },function errorCallback(response){
            console.log(response);
        });
    };

    this.deleteSchedule = function (webUrl,objSchedule) {
        return $http({
            method: 'DELETE',
            url: webUrl +  'api/schedules/' + objSchedule.Id,
            //withCredentials: true,
           data: objSchedule
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

    /*********************************** Contacts **********************************/

    this.getContacts = function (webUrl) {
        return $http({
            method: 'GET',
            //withCredentials: true,
            data: 'json',
            url: webUrl +  'api/contacts'
        });
    };

    this.addContact = function (webUrl, objContact) {
        return $http({
            method: 'POST',
            url: webUrl +  'api/contacts',
            data: objContact,
            //withCredentials: true,
        }).then(function successCallback(response){
            console.log(response);
            return common.successResponse(response);
        },function errorCallback(response){
            console.log(response);
            return common.errorResponse(response);
        });
    };

    this.deleteContact = function (webUrl,objContact) {
        return $http({
            method: 'DELETE',
            url: webUrl +  'api/contacts/' + objContact.Id,
            //withCredentials: true,
           data: objContact
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

    this.getPlayersByTeamId = function (webUrl,teamId) {
        return $http({
            method: 'GET',
            //withCredentials: true,
            data: 'json',
            url: webUrl +  'api/playersByTeam/' + teamId
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

    /*********************************** login **********************************/

    this.register = function (webUrl, objUser) {
        return $http({
            method: 'POST',
            url: webUrl +  'api/users/register',
            data: objUser,
            //withCredentials: true,
        }).then(function successCallback(response){
            return response;
            console.log(response);
        },function errorCallback(response){
            console.log(response);
        });
    };

    this.authenticate = function (webUrl, objUser) {
        return $http({
            method: 'POST',
            url: webUrl +  'api/users/authenticate',
            data: objUser,
            //withCredentials: true,
        }).then(function successCallback(response){
            return response;
        },function errorCallback(response){
            console.log(response);
        });
    };

    this.changePassword = function (webUrl, objUser) {
        return $http({
            method: 'POST',
            url: webUrl +  'api/users/changepass',
            data: objUser,
            //withCredentials: true,
        }).then(function successCallback(response){
            console.log(response);
        },function errorCallback(response){
            console.log(response);
        });
    };

  });

