'use strict';

/**
 * @ngdoc function
 * @name nvslonlineAppApp.controller:TeamCtrl
 * @description
 * # TeamCtrl
 * Controller of the nvslonlineAppApp
 */
angular.module('nvslonlineAppApp')
  .controller('TeamCtrl', ['$scope', '$modal', 'datacontext', 'toastr', 'webUrl', function ($scope, $modal, datacontext, toastr, webUrl) {
    var vm = this; 

    datacontext.getTeams(webUrl).then(
      function (response) {
        console.log(response.data);
        vm.teams = response.data;
      }, function(response) {
        toastr.error("Error has occurred: " + response.data.Message, "Fatal error", {
          positionClass: 'toast-bottom-full-width'
        })                
      });
      
  }]);
