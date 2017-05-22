'use strict';

/**
 * @ngdoc function
 * @name nvslonlineAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the nvslonlineAppApp
 */
angular.module('nvslonlineAppApp')
  .controller('MainCtrl', function ($rootScope,$scope,$location,parameters,common) {
    var vm = this;
    common.accessLogin();
    vm.title = "Northern Virginia Soccer League"
    vm.login = login;
    vm.logOut = logOut;

    
    $rootScope.$on("update", function(){
      var objLoginAccess =  parameters.getLoginAccess();
      vm.access = objLoginAccess.access;
      vm.user = objLoginAccess.user;
    });

    function login() {
      

      parameters.loginAccess.access = true;
      parameters.loginAccess.user = "beimar medina";
      vm.access = true;
      vm.user = "beimar medina";
      
      $location.path('/dashboard');
      
      //$location.path('/login')
    } 

    function logOut() {
      //parameters.setLoginAccess("",false)
      parameters.loginAccess.access = false;
      vm.access = false;
      $location.path('/home')
    } 
    
  });
