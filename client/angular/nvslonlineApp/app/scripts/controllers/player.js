'use strict';

/**
 * @ngdoc function
 * @name nvslonlineAppApp.controller:PlayerCtrl
 * @description
 * # PlayerCtrl
 * Controller of the nvslonlineAppApp
 */
angular.module('nvslonlineAppApp')
  .controller('PlayerCtrl', function ($stateParams,datacontext,webUrl) {
    var vm = this;
    vm.teamId = $stateParams.teamId;
    if (vm.teamId !== null) {
      datacontext.getTeamById(webUrl,vm.teamId).then(
            function (response) {
                console.log(response.data);
                vm.team = response.data;
            }, function(response) {
                toastr.error("Error has occurred: " + response.data.Message, "Fatal error", {
                positionClass: 'toast-bottom-full-width'
                })                
            });
      datacontext.getPlayersByTeamId(webUrl,vm.teamId).then(
            function (response) {
                console.log(response.data);
                vm.players = response.data;
            }, function(response) {
                toastr.error("Error has occurred: " + response.data.Message, "Fatal error", {
                positionClass: 'toast-bottom-full-width'
                })                
            });

    }


  });
