'use strict';

/**
 * @ngdoc function
 * @name nvslonlineAppApp.controller:AContactCtrl
 * @description
 * # AContactCtrl
 * Controller of the nvslonlineAppApp
 */
angular.module('nvslonlineAppApp')
  .controller('AContactCtrl', function (toastr,datacontext,webUrl, parameters,$modal,$location) {
   var vm = this;
   if (parameters.loginAccess.access === false) {
        $location.path('/home');
    }
   getMessages();
   function getMessages(){
      datacontext.getContacts(webUrl).then(
            function (response) {
                
                vm.messages = response.data;
            }, function(response) {
                toastr.error("Error has occurred: " + response.data.Message, "Fatal error", {
                positionClass: 'toast-bottom-full-width'
                })                
            });
   }
  
   vm.request = function(Id){
     var requestSubject = parameters.requestSubject;
     return findRequest(Id,requestSubject);
   }

   vm.openDeleteNew = function(objContact) {
            var options = {};
            options.requestSubjectList = parameters.requestSubject;
            options.contact = objContact;
            options.webUrl = webUrl;

            var modalInstance = $modal.open({
                templateUrl: 'delete.html',
                controller: modalInstanceDeleteContact,
                resolve: {
                    options: function () { //esta es la info enviada al modal si se cargo correctamente. tb se puede info en el scope que abre el modal
                        return options;
                    }
                }
            });
            modalInstance.result.then(function (data) {
               getMessages();
            }, function () {
            });
        } 


  });

  function findRequest(Id, requestSubjectList){
     //var requestSubject = parameters.requestSubject;
     for (var index = 0; index < requestSubjectList.length; index++) {
       if (requestSubjectList[index].Id == Id) {
         return requestSubjectList[index].subject;
       }
     }
   }

var modalInstanceDeleteContact = function ($scope, $modalInstance, datacontext, options) {
    
        var contact = options.contact;
        $scope.title = contact.yourName + " - " + findRequest(contact.requestSubject,options.requestSubjectList);
        
        $scope.ok = function () {
            var dataUpdated = datacontext.deleteContact(options.webUrl,contact);
            $modalInstance.close(dataUpdated);
        };
        $scope.cancel = function () { $modalInstance.dismiss('cancel'); };
    };