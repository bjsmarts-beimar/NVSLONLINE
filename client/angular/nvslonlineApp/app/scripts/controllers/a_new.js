'use strict';

/**
 * @ngdoc function
 * @name nvslonlineAppApp.controller:ANewCtrl
 * @description
 * # ANewCtrl
 * Controller of the nvslonlineAppApp
 */
angular.module('nvslonlineAppApp')
  .controller('ANewCtrl', ['$scope', '$modal', 'datacontext', 'toastr', 'webUrl','parameters','$location','common', 
  function ($scope, $modal, datacontext, toastr, webUrl, parameters, $location,common) {
    var vm = this; 
    common.accessLogin();
    vm.openNew = openNew;
    vm.openEditNew = openEditNew;
    vm.openDeleteNew = openDeleteNew;

    getNews();
     function getNews() {
           datacontext.getNews(webUrl).then(
            function (response) {
                console.log(response.data);
                vm.news = response.data;
            }, function(response) {
                toastr.error("Error has occurred: " + response.data.Message, "Fatal error", {
                positionClass: 'toast-bottom-full-width'
                })                
            });
     };

       function openNew() {   
            var options = {};
            options.webUrl = webUrl;

            var modalInstance = $modal.open({
                templateUrl: 'new.html',
                controller: modalInstanceNew ,
                controllerAs: vm,
                //size: size,

                resolve: {
                    options: function () { //esta es la info enviada al modal si se cargo correctamente. tb se puede info en el scope que abre el modal
                        return options;
                    }
                }
            });

            modalInstance.result.then(function (data) {
              console.log(data);
               getNews();
                //vm.divisions = data;
                //log('Changes Saved');
            }, function () {
            });
        }

         function openEditNew(objNew) {
            
            var options = {};
            options.new = objNew;
            options.webUrl = webUrl;
           
            var modalInstance = $modal.open({
                templateUrl: 'new.html',
                controller: modalInstanceEditNew,
                //size: size,

                resolve: {
                    options: function () { //esta es la info enviada al modal si se cargo correctamente. tb se puede info en el scope que abre el modal
                        return options;
                    }
                }
            });
            modalInstance.result.then(function (dataUpdated) {
                getNews();
                //log('Changes Saved');

            }, function () {
            });
        } 


        function openDeleteNew(objNew) {
            var options = {};
            options.new = objNew;
            options.webUrl = webUrl;

            var modalInstance = $modal.open({
                templateUrl: 'delete.html',
                controller: modalInstanceDeleteNew,
                //size: size,

                resolve: {
                    options: function () { //esta es la info enviada al modal si se cargo correctamente. tb se puede info en el scope que abre el modal
                        return options;
                    }
                }
            });
            modalInstance.result.then(function (data) {
               getNews();
            }, function () {
            });
        } 
  }]);

var modalInstanceNew = ['$scope', '$modalInstance', 'options', 'datacontext','parameters',
       function ($scope, $modalInstance, options, datacontext,parameters) {
          
           $scope.ok = function () {
               var newValues = {};
               newValues.title = this.title;
               newValues.description = this.description;
               newValues.IsHidden = false;
               newValues.modifiedBy = parameters.loginAccess.user;
               newValues.modifiedByfullName = parameters.loginAccess.user;

               console.log(newValues);
               var dataUpdated = datacontext.addNew(options.webUrl,newValues);

               $modalInstance.close(dataUpdated);
           };
           $scope.cancel = function () { $modalInstance.dismiss('cancel'); };
       }];

var modalInstanceEditNew= ['$scope', '$modalInstance', 'datacontext', 'options', 'parameters',
function ($scope, $modalInstance, datacontext, options, parameters) {
        
        var newValues = options.new;
        $scope.title = newValues.title;
        $scope.description = newValues.description;
       
        $scope.ok = function () {
            
            newValues.title = this.title;
            newValues.description = this.description;
            newValues.IsHidden = false;
            newValues.modifiedBy = parameters.loginAccess.user;
            newValues.modifiedByfullName = parameters.loginAccess.user;

            var dataUpdated = datacontext.editNew(options.webUrl,newValues);
            $modalInstance.close(dataUpdated);
        };
        $scope.cancel = function () { $modalInstance.dismiss('cancel'); };
    }];

  var modalInstanceDeleteNew = ['$scope', '$modalInstance', 'datacontext', 'options', 
  function ($scope, $modalInstance, datacontext, options) {
    
        var objNew = options.new;

        $scope.title = objNew.title;
        
        $scope.ok = function () {
            
            var dataUpdated = datacontext.deleteNew(options.webUrl,objNew);
            //console.log(updated);
            $modalInstance.close(dataUpdated);
        };
        $scope.cancel = function () { $modalInstance.dismiss('cancel'); };
    }];