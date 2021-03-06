'use strict';

/**
 * @ngdoc function
 * @name nvslonlineAppApp.controller:ADivisionCtrl
 * @description
 * # ADivisionCtrl
 * Controller of the nvslonlineAppApp
 */
angular.module('nvslonlineAppApp')
  .controller('ADivisionCtrl', ['$scope', '$modal', 'datacontext', 'toastr', 'webUrl', 'parameters','$location','common',
  function ($scope, $modal, datacontext, toastr, webUrl, parameters, $location, common) {
    var vm = this; 
    common.accessLogin(); 

    vm.openNewDivision = openNewDivision;
    vm.openEditDivision = openEditDivision;
    vm.openDeleteDivision = openDeleteDivision;

 
    getDivision();
     function getDivision() {
           datacontext.getDivisions(webUrl).then(
            function (response) {
                console.log(response.data);
                vm.divisions = response.data;
            }, function(response) {
                toastr.error("Error has occurred: " + response.data.Message, "Fatal error", {
                positionClass: 'toast-bottom-full-width'
                })                
            });
     };

  function openNewDivision() {   
            var options = {};
            options.webUrl = webUrl;

            var modalInstance = $modal.open({
                templateUrl: 'division.html',
                controller: modalInstanceNewDivision ,
                controllerAs: vm,
                //size: size,

                resolve: {
                    options: function () { //esta es la info enviada al modal si se cargo correctamente. tb se puede info en el scope que abre el modal
                        return options;
                    }
                }
            });

            modalInstance.result.then(function (data) {
              
               getDivision();
                //vm.divisions = data;
                //log('Changes Saved');
            }, function () {
            });
        }  

   function openEditDivision(division) {
            
            var options = {};
            options.division = division;
            options.webUrl = webUrl;
           
            var modalInstance = $modal.open({
                templateUrl: 'division.html',
                controller: modalInstanceEditDivision,
                //size: size,

                resolve: {
                    options: function () { //esta es la info enviada al modal si se cargo correctamente. tb se puede info en el scope que abre el modal
                        return options;
                    }
                }
            });
            modalInstance.result.then(function (dataUpdated) {
                getDivision();
                //log('Changes Saved');

            }, function () {
            });
        }

      function openDeleteDivision(division) {
            var options = {};
            options.division = division;
            options.webUrl = webUrl;

            var modalInstance = $modal.open({
                templateUrl: 'delete.html',
                controller: modalInstanceDeleteDivision,
                //size: size,

                resolve: {
                    options: function () { //esta es la info enviada al modal si se cargo correctamente. tb se puede info en el scope que abre el modal
                        return options;
                    }
                }
            });
            modalInstance.result.then(function (data) {
               getDivision();
                //log('Changes Saved');
            }, function () {
            });
        } 

  }]);


  var modalInstanceNewDivision = ['$scope', '$modalInstance', 'options', 'datacontext','toastr',
       function ($scope, $modalInstance, options, datacontext, toastr) {
          
           $scope.ok = function () {
               var divisionValues = {};
               divisionValues.DivisionName = this.divisionName;
               divisionValues.IsHidden = false;

               datacontext.addDivision(options.webUrl,divisionValues).then(function (response) {
                   console.log(response);
                   if (response.status!=200) {
                       toastr.error("Error has occurred: " + response.data, "Fatal error", {
                        positionClass: 'toast-bottom-full-width'})
                   }else{
                       $modalInstance.close(response);
                   }
                });

           };
           $scope.cancel = function () { $modalInstance.dismiss('cancel'); };
       }];

  var modalInstanceEditDivision = ['$scope', '$modalInstance', 'datacontext', 'options', 'toastr',
    function ($scope, $modalInstance, datacontext, options,toastr) {
        
        var objDiv = options.division;
        $scope.divisionName = objDiv.DivisionName;
       
        var aux = JSON.parse(JSON.stringify(objDiv));
        $scope.ok = function () {
            
            objDiv.DivisionName = this.divisionName;

            datacontext.editDivision(options.webUrl,objDiv).then(function (response) {
                   if (response.status!=200) {
                       toastr.error("Error has occurred: " + response.data, "Fatal error", {
                        positionClass: 'toast-bottom-full-width'})
                        objDiv.DivisionName=aux.DivisionName;
                   }else{
                       $modalInstance.close(response);
                   }
                });
        };
        $scope.cancel = function () { $modalInstance.dismiss('cancel'); };
    }];

  var modalInstanceDeleteDivision = ['$scope', '$modalInstance', 'datacontext', 'options', 
    function ($scope, $modalInstance, datacontext, options) {
    
        var objDivision = options.division;

        $scope.divisionName = objDivision.DivisionName;
        
        $scope.ok = function () {
            
            var dataUpdated = datacontext.deleteDivision(options.webUrl,objDivision);
            //console.log(updated);
            $modalInstance.close(dataUpdated);
        };
        $scope.cancel = function () { $modalInstance.dismiss('cancel'); };
    }];
 