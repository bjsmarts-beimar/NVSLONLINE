'use strict';

/**
 * @ngdoc function
 * @name nvslonlineAppApp.controller:ASeasonCtrl
 * @description
 * # ASeasonCtrl
 * Controller of the nvslonlineAppApp
 */
angular.module('nvslonlineAppApp')
  .controller('ASeasonCtrl', ['$scope', '$modal', 'datacontext', 'toastr', 'webUrl','common','parameters','$location',
  function ($scope, $modal, datacontext, toastr, webUrl, common, parameters, $location) {
    var vm = this;
    common.accessLogin();
    vm.convertToTime = common.convertToTime;
    vm.convertToDate = common.convertToDate;
        
        vm.title = 'Season';
        vm.openNewSeason = openNewSeason;
        vm.openEditSeason = openEditSeason;
        vm.openDeleteSeason = openDeleteSeason;
        
        getSeason();
         function getSeason() {
            return datacontext.getSeasons(webUrl).then(function (response) {
                //console.log(data);
                return vm.seasons = response.data;
            });
        }
        
        function openNewSeason() {
            var options = {};
            options.webUrl = webUrl;

            var modalInstance = $modal.open({
                templateUrl: 'season.html',
                controller: modalInstanceNewSeason,
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
                getSeason();
                //log('Changes Saved');
            }, function () {
            });
        }

        function openEditSeason(season) {
            
            var options = {};
            options.webUrl = webUrl;
            options.season = season;
            //options.dataDivision = dataDivision;

            var modalInstance = $modal.open({
                templateUrl: 'season.html',
                controller: modalInstanceEditSeason,
                //size: size,

                resolve: {
                    options: function () { //esta es la info enviada al modal si se cargo correctamente. tb se puede info en el scope que abre el modal
                        return options;
                    }
                }
            });
            modalInstance.result.then(function (dataUpdated) {
                getSeason();
                //log('Changes Saved');

            }, function () {
            });
        }

        function openDeleteSeason(season) {
            var options = {};
            options.season = season;
            options.webUrl = webUrl;

            var modalInstance = $modal.open({
                templateUrl: 'delete.html',
                controller: modalInstanceDeleteSeason,
                //size: size,

                resolve: {
                    options: function () { //esta es la info enviada al modal si se cargo correctamente. tb se puede info en el scope que abre el modal
                        return options;
                    }
                }
            });
            modalInstance.result.then(function (data) {
               getSeason();
                //log('Changes Saved');
            }, function () {
            });
        } 

  }]);

  var modalInstanceNewSeason = ['$scope', '$modalInstance', 'options', 'datacontext','$filter','toastr',
        function($scope, $modalInstance, options, datacontext,$filter,toastr) {
            $scope.ok = function () {
                var seasonValues = {};
                seasonValues.SeasonName = this.seasonName;
                seasonValues.Active = false;
                seasonValues.IsHidden = false;
                seasonValues.SeasonStart = $filter('date')(this.seasonStart, 'yyyy-MM-dd');
                seasonValues.SeasonEnd = $filter('date')(this.seasonEnd,'yyyy-MM-dd');

                datacontext.addSeason(options.webUrl,seasonValues).then(function (response) {
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

    var modalInstanceEditSeason = ['$scope', '$modalInstance', 'datacontext','common', 'options','$filter','toastr',
        function ($scope, $modalInstance, datacontext,common, options, $filter,toastr) {

        var objSeason = options.season;
      
        $scope.seasonName = objSeason.SeasonName;
        $scope.seasonStart = common.convertToDate(objSeason.SeasonStart);
        $scope.seasonEnd = common.convertToDate(objSeason.SeasonEnd);
       
        var aux = JSON.parse(JSON.stringify(objSeason));
        $scope.ok = function () {
           
            objSeason.SeasonName = this.seasonName;
            objSeason.SeasonStart = $filter('date')(this.seasonStart, 'yyyy-MM-dd');
            objSeason.SeasonEnd = $filter('date')(this.seasonEnd,'yyyy-MM-dd');

            datacontext.editSeason(options.webUrl,objSeason).then(function (response) {
                   if (response.status!=200) {
                       toastr.error("Error has occurred: " + response.data, "Fatal error", {
                        positionClass: 'toast-bottom-full-width'})
                        objSeason.SeasonName=aux.SeasonName;
                        objSeason.SeasonStart=aux.SeasonStart;
                        objSeason.SeasonEnd=aux.SeasonEnd;
                   }else{
                       $modalInstance.close(response);
                   }
                });

        };
        $scope.cancel = function () { $modalInstance.dismiss('cancel'); };
    }];

var modalInstanceDeleteSeason = ['$scope', '$modalInstance', 'datacontext', 'options', 
function ($scope, $modalInstance, datacontext, options) {
    
        var objSeason = options.season;

        $scope.seasonName = objSeason.SeasonName;
        
        $scope.ok = function () {
            
            var dataUpdated = datacontext.deleteSeason(options.webUrl,objSeason);
            //console.log(updated);
            $modalInstance.close(dataUpdated);
        };
        $scope.cancel = function () { $modalInstance.dismiss('cancel'); };
    }];