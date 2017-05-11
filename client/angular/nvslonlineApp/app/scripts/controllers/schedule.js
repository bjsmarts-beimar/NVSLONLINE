'use strict';

/**
 * @ngdoc function
 * @name nvslonlineAppApp.controller:ScheduleCtrl
 * @description
 * # ScheduleCtrl
 * Controller of the nvslonlineAppApp
 */
angular.module('nvslonlineAppApp')
  .controller('ScheduleCtrl', ['$scope', '$modal', 'datacontext', 'toastr', 'webUrl','common', 
  function ($scope, $modal, datacontext, toastr, webUrl, common) {
    var vm = this; 

    //vm.getScheduleBySeasonDivision = getScheduleBySeasonDivision;
    vm.convertToTime = common.convertToTime;
    vm.convertToDate = common.convertToDate;
    vm.convertMomentDate = common.convertMomentDate;
    vm.convertMomentTime = common.convertMomentTime;
      

    vm.getSeasonName = common.getSeasonName;
    vm.getDivisionName = common.getDivisionName;
    getTeams();
    function getTeams() {
            return datacontext.getTeams(webUrl).then(function (response) {
                //console.log(data);
                return vm.teams = response.data;
            });
        }


    datacontext.getSeasons(webUrl).then(
      function (response) {
        //console.log(response.data);
        vm.seasons = response.data;
      }, function(response) {
        toastr.error("Error has occurred: " + response.data.Message, "Fatal error", {
          positionClass: 'toast-bottom-full-width'
        })                
      });

       datacontext.getDivisions(webUrl).then(
      function (response) {
        console.log(response.data);
        vm.divisions = response.data;
      }, function(response) {
        toastr.error("Error has occurred: " + response.data.Message, "Fatal error", {
          positionClass: 'toast-bottom-full-width'
        })                
      });

      datacontext.getSchedules(webUrl).then(
      function (response) {
        console.log(response.data);
        vm.schedules = response.data;
      }, function(response) {
        toastr.error("Error has occurred: " + response.data.Message, "Fatal error", {
          positionClass: 'toast-bottom-full-width'
        })                
      });

      

  }]);