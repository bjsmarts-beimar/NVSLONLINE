'use strict';

/**
 * @ngdoc function
 * @name nvslonlineAppApp.controller:AVenueCtrl
 * @description
 * # AVenueCtrl
 * Controller of the nvslonlineAppApp
 */
angular.module('nvslonlineAppApp')
  .controller('AVenueCtrl', ['$scope', '$modal', 'datacontext', 'toastr', 'webUrl','common','parameters','$location',
  function ($scope, $modal, datacontext, toastr, webUrl, common, parameters, $location) {
    var vm = this;
        common.accessLogin();
        vm.title = 'Venues';
        vm.openNewVenue = openNewVenue;
        vm.openEditVenue = openEditVenue;
        
        getVenues();
         function getVenues() {
            return datacontext.getVenues(webUrl).then(function (response) {
                //console.log(data);
                return vm.venues = response.data;
            });
        }
        
        function openNewVenue() {
            var options = {};
            options.webUrl = webUrl;

            var modalInstance = $modal.open({
                templateUrl: 'venue.html',
                controller: modalInstanceNewVenue,
                //size: size,

                resolve: {
                    options: function () { //esta es la info enviada al modal si se cargo correctamente. tb se puede info en el scope que abre el modal
                        return options
                        /*return {
                            //dataDivision
                        };*/
                    }
                }
            });

            modalInstance.result.then(function (data) {
                getVenues();
                //log('Changes Saved');
            }, function () {
            });
        }

        function openEditVenue(venue) {
            
            var options = {};
            options.webUrl = webUrl;
            options.venue = venue;
            //options.dataDivision = dataDivision;

            var modalInstance = $modal.open({
                templateUrl: 'venue.html',
                controller: modalInstanceEditVenue,
                //size: size,

                resolve: {
                    options: function () { //esta es la info enviada al modal si se cargo correctamente. tb se puede info en el scope que abre el modal
                        return options;
                    }
                }
            });
            modalInstance.result.then(function (dataUpdated) {
                getVenues();
                //log('Changes Saved');

            }, function () {
            });
        }
  }]);

  var modalInstanceNewVenue = ['$scope', '$modalInstance', 'options', 'datacontext','$filter','toastr',
        function($scope, $modalInstance, options, datacontext,$filter,toastr) {
            $scope.ok = function () {
                var venueValues = {};
                venueValues.VenueName = this.venueName;
                venueValues.IsHidden = false;
                
                datacontext.addVenue(options.webUrl,venueValues).then(function (response) {
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

    var modalInstanceEditVenue = ['$scope', '$modalInstance', 'datacontext','common', 'options','$filter', 'toastr',
        function ($scope, $modalInstance, datacontext,common, options, $filter, toastr) {

        var objVenue = options.venue;
        $scope.venueName = objVenue.VenueName;
        var aux = JSON.parse(JSON.stringify(objVenue));
        $scope.ok = function () {
           
            objVenue.VenueName = this.venueName;
           
           datacontext.editVenue(options.webUrl,objVenue).then(function (response) {
                   if (response.status!=200) {
                       toastr.error("Error has occurred: " + response.data, "Fatal error", {
                        positionClass: 'toast-bottom-full-width'})
                        objVenue.VenueName=aux.VenueName;
                   }else{
                       $modalInstance.close(response);
                   }
                });
            
        };
        $scope.cancel = function () { $modalInstance.dismiss('cancel'); };
    }];

