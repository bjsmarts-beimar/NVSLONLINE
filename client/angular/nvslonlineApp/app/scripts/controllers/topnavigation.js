'use strict';

/**
 * @ngdoc function
 * @name nvslonlineAppApp.controller:TopnavigationCtrl
 * @description
 * # TopnavigationCtrl
 * Controller of the nvslonlineAppApp
 */
angular.module('nvslonlineAppApp')
  .controller('TopnavigationCtrl', 
  function ($scope) {
  var vm = this;

  //getRoles();
  //getTopNavigation();
       
        function getSchedule() {
            return datacontext.getRoles(webUrl).then(function (response) {
                //console.log(data);
                return vm.roles = response.data;
            });
        }
        
        function getTopNavigation() {
            return datacontext.getTopNavigations(webUrl).then(function (response) {
                //console.log(data);
                return vm.topNavigation = response.data;
            });
        }
    vm.test = "hol";
  });
