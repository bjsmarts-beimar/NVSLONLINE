'use strict';

/**
 * @ngdoc function
 * @name nvslonlineAppApp.controller:StandingCtrl
 * @description
 * # StandingCtrl
 * Controller of the nvslonlineAppApp
 */
angular.module('nvslonlineAppApp')
  .controller('StandingCtrl', ['$scope', '$modal', 'datacontext', 'toastr', 'webUrl','common', function ($scope, $modal, datacontext, toastr, webUrl, common) {
    var vm = this; 

datacontext.getSchedules(webUrl).then(
      function (response) {
        console.log(response.data);
        vm.schedules = response.data;
      }, function(response) {
        toastr.error("Error has occurred: " + response.data.Message, "Fatal error", {
          positionClass: 'toast-bottom-full-width'
        })                
      });
 datacontext.getTeams(webUrl).then(
      function (response) {
        console.log(response.data);
        vm.teams = response.data;
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

 datacontext.getSeasons(webUrl).then(
      function (response) {
        //console.log(response.data);
        vm.seasons = response.data;
      }, function(response) {
        toastr.error("Error has occurred: " + response.data.Message, "Fatal error", {
          positionClass: 'toast-bottom-full-width'
        })                
      });

      

      
      

    }]);
