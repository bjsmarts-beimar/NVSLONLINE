'use strict';

/**
 * @ngdoc function
 * @name nvslonlineAppApp.controller:DivisionCtrl
 * @description
 * # DivisionCtrl
 * Controller of the nvslonlineAppApp
 */
angular.module('nvslonlineAppApp')
  .controller('DivisionCtrl', ['$scope', '$modal', 'datacontext', 'toastr', 'webUrl', 
  function ($scope, $modal, datacontext, toastr, webUrl) {
    var vm = this; 

    datacontext.getDivisions(webUrl).then(
      function (response) {
        
        console.log(response.data);
        vm.divisions = response.data;
      }, function(response) {
          console.log(response);
          toastr.error("Error has occurred: " + response.data.Message, "Fatal error", {
          positionClass: 'toast-bottom-full-width'
        })               
      });
       
  }]);
