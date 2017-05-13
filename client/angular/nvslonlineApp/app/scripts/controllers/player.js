'use strict';

/**
 * @ngdoc function
 * @name nvslonlineAppApp.controller:PlayerCtrl
 * @description
 * # PlayerCtrl
 * Controller of the nvslonlineAppApp
 */
angular.module('nvslonlineAppApp')
  .controller('PlayerCtrl', function (toastr,$stateParams,datacontext,webUrl,$location,parameters,common) {
    var vm = this;
    vm.teamId = $stateParams.teamId;
    if (vm.teamId !== null) {
      datacontext.getTeamById(webUrl,vm.teamId).then(
            function (response) {
                vm.team = response.data;
            }, function(response) {
                toastr.error("Error has occurred: " + response.data.Message, "Fatal error", {
                positionClass: 'toast-bottom-full-width'
                })                
            });
      datacontext.getPlayersByTeamId(webUrl,vm.teamId).then(
            function (response) {
                vm.players = response.data;

                vm.error_message = common.length_message(vm.players,parameters.error_message.noPlayersTeam)
                
            }, function(response) {
                toastr.error("Error has occurred: " + response.data.Message, "Fatal error", {
                positionClass: 'toast-bottom-full-width'
                })                
            });

    }else{
      if (parameters.getLoginAccess().access === true ) {
        $location.path('/dashboard');
      }else{
        $location.path('/home');
      }
           
    }


  });
