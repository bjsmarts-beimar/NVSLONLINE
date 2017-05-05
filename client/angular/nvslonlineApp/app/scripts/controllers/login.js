'use strict';

/**
 * @ngdoc function
 * @name nvslonlineAppApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the nvslonlineAppApp
 */
angular.module('nvslonlineAppApp')
  .controller('LoginCtrl', ['$scope', 'datacontext', 'toastr', 'webUrl','common', '$timeout','$location','parameters',
  function ($scope, datacontext, toastr, webUrl, common,$timeout,$location,parameters) {
  
    var vm = this; 

        vm.login = function () {
        
               var userValues = {};
               userValues.username = vm.loginusername;
               userValues.password = vm.loginpassword;
               
               $timeout(function(){
                   datacontext.authenticate(webUrl,userValues).then(function (response){
                       
                       if (response.data == true) {
                           parameters.setLoginAccess(vm.loginusername,true)
                           
                           $location.path('/dashboard');
                       }else{
                            vm.error_message = parameters.error_message.userPassIncorrect;
                           return;
                       }
                   })
               },1000);

           };

        vm.register = function(){

            if (vm.password === vm.cpassword && vm.password !== undefined) {
                var userValues = {};
               userValues.first_name = vm.firstname;
               userValues.last_name = vm.lastname;
               userValues.email = vm.email;
               userValues.username = vm.username;
               userValues.password = vm.password;

               $timeout(function(){
                   datacontext.register(webUrl,userValues).then(function (response){
                       var objUser = response.data;//devuleve un objeto con los datos del registro

                       if (objUser.username === vm.username) {
                           parameters.setLoginAccess(vm.username,true);
                           $location.path('/dashboard');
                       }
                       else{
                           vm.error_message = parameters.error_message.errorRegister;
                       }
                   })
               },1000);
            }
            else{
                vm.error_message = parameters.error_message.passNoCoinciden;
            }
        }

  }]);
