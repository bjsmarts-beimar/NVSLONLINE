'use strict';

/**
 * @ngdoc function
 * @name nvslonlineAppApp.controller:ContactCtrl
 * @description
 * # ContactCtrl
 * Controller of the nvslonlineAppApp
 */
angular.module('nvslonlineAppApp')
  .controller('ContactCtrl', function (common,parameters,datacontext,webUrl) {
   var vm = this;

   vm.request = parameters.requestSubject;

   var number1 = common.randomNumber(1, 50);
   var number2 = common.randomNumber(1, 50);
   var result = number1 + number2;

    vm.captcha = number1 + ' + ' + number2;
    
    vm.refresh = function(){
      number1 = common.randomNumber(1, 50);
      number2 = common.randomNumber(1, 50);
      result = number1 + number2;
      vm.captcha = number1 + ' + ' + number2;
    }

    

    vm.messageCaptcha = "";
      vm.submit = function submit(){
      if(result == vm.captchaValue){
        vm.messageCaptcha = "";
          
          var contactValues = {};
                contactValues.yourName = vm.name;
                contactValues.email = vm.email;
                contactValues.message = vm.message;
                contactValues.IsHidden = false;

                contactValues.requestSubject = vm.requestSubject;
                contactValues.modifiedBy = parameters.loginAccess.user;
                contactValues.modifiedByfullName = parameters.loginAccess.user;
               
                console.log(contactValues);
                
                var dataUpdated = datacontext.addContact(webUrl,contactValues);


      }else{
        vm.messageCaptcha = "Invalid response";
      }  
    }
  });
