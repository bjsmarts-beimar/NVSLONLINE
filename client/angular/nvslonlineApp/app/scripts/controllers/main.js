'use strict';

/**
 * @ngdoc function
 * @name nvslonlineAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the nvslonlineAppApp
 */
angular.module('nvslonlineAppApp')
  .controller('MainCtrl', function ($scope,$location,parameters) {
    var vm = this;
    vm.title = "Northern Virginia Soccer League"
    vm.login = login;
    vm.logOut = logOut;

    var loginAccess = parameters.loginAccess.access
    vm.access =  loginAccess;
    console.log(parameters.loginAccess);

    function login() {
      parameters.loginAccess.access = true;
      vm.access = true;
      
      $location.path('/dashboard')
    } 

    function logOut() {
      parameters.loginAccess.access = false;
      vm.access = false;
      $location.path('/home')
    } 
    
  });
