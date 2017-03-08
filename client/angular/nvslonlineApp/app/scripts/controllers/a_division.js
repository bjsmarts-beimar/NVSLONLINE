'use strict';

/**
 * @ngdoc function
 * @name nvslonlineAppApp.controller:ADivisionCtrl
 * @description
 * # ADivisionCtrl
 * Controller of the nvslonlineAppApp
 */
angular.module('nvslonlineAppApp')
  .controller('ADivisionCtrl', ['$scope', '$modal', 'datacontext', 'toastr', 'webUrl', 
  function ($scope, $modal, datacontext, toastr, webUrl) {
    var vm = this; 
    vm.openNewDivision = openNewDivision;
    vm.openEditDivision = openEditDivision;
    vm.openDeleteDivision = openDeleteDivision;

    datacontext.getDivisions(webUrl).then(
      function (response) {
        console.log(response.data);
        vm.divisions = response.data;
      }, function(response) {
        toastr.error("Error has occurred: " + response.data.Message, "Fatal error", {
          positionClass: 'toast-bottom-full-width'
        })                
      });

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
              console.log(data);
                //getTeams();
                vm.divisions = data;
                log('Changes Saved');
            }, function () {
            });
        }  

   function openEditDivision(division) {
            
            var options = {};
            options.division = division;
           
            var modalInstance = $modal.open({
                templateUrl: 'division.html',
                controller: modalInstanceEdit,
                //size: size,

                resolve: {
                    options: function () { //esta es la info enviada al modal si se cargo correctamente. tb se puede info en el scope que abre el modal
                        return options;
                    }
                }
            });
            modalInstance.result.then(function (dataUpdated) {
                vm.divisions = dataUpdated;
                log('Changes Saved');

            }, function () {
            });
        }

      function openDeleteDivision(division) {
            var options = {};
            options.division = division;
            var modalInstance = $modal.open({
                templateUrl: 'delete.html',
                controller: modalInstanceDelete,
                //size: size,

                resolve: {
                    options: function () { //esta es la info enviada al modal si se cargo correctamente. tb se puede info en el scope que abre el modal
                        return options;
                    }
                }
            });
            modalInstance.result.then(function (data) {
                vm.divisions = data;
                log('Changes Saved');
            }, function () {
            });
        } 

  }]);


  var modalInstanceNewDivision = ['$scope', '$modalInstance', 'options', 'datacontext',
   
       function ($scope, $modalInstance, options, datacontext) {
          
           $scope.ok = function () {
               var divisionValues = {};
               divisionValues.DivisionName = this.divisionName;
               divisionValues.IsHidden = false;

               var dataUpdated = datacontext.addDivision(options.webUrl,divisionValues);

               $modalInstance.close(dataUpdated);
           };
           $scope.cancel = function () { $modalInstance.dismiss('cancel'); };
       }];

  var modalInstanceEdit = ['$scope', '$modalInstance', 'datacontext', 'options', function ($scope, $modalInstance, datacontext, options) {
        
        var objDivision = options.division;
        $scope.divisionName = objDivision.DivisionName;
       
        $scope.ok = function () {
            
            objDivision.DivisionName = this.divisionName;

            var dataUpdated = datacontext.editDivision(objDivision);
            $modalInstance.close(dataUpdated);
        };
        $scope.cancel = function () { $modalInstance.dismiss('cancel'); };
    }];

  var modalInstanceDelete = ['$scope', '$modalInstance', 'datacontext', 'options', function ($scope, $modalInstance, datacontext, options) {
    
        var objDivision = options.division;

        $scope.divisionName = objDivision.DivisionName;
        
        $scope.ok = function () {
            
            var dataUpdated = datacontext.deleteDivision(objDivision);
            //console.log(updated);
            $modalInstance.close(dataUpdated);
        };
        $scope.cancel = function () { $modalInstance.dismiss('cancel'); };
    }];
 