'use strict';

/**
 * @ngdoc function
 * @name nvslonlineAppApp.controller:ASeasonCtrl
 * @description
 * # ASeasonCtrl
 * Controller of the nvslonlineAppApp
 */
angular.module('nvslonlineAppApp')
  .controller('ASeasonCtrl', ['$scope', '$modal', 'datacontext', 'toastr', 'webUrl', 
  function ($scope, $modal, datacontext, toastr, webUrl) {
    var vm = this;
        //vm.news = {
        //    title: 'Hot Towel Angular',
        //    description: 'Hot Towel Angular is a SPA template for Angular developers.'
        //};
        //vm.messageCount = 0;
        //vm.people = [];
        vm.title = 'Season';
        vm.openNewSeason = openNewSeason;
        vm.openEditSeason = openEditSeason;
        //vm.openDeleteTeam = openDeleteTeam;
        vm.convertToDate = convertToDate;

         function getSeason() {
            return datacontext.getSeasons().then(function (data) {
                //console.log(data);
                return vm.seasons = data;
            });
        }
        
        function openNewSeason() {
            
            var modalInstance = $modal.open({
                templateUrl: 'season.html',
                controller: modalInstanceNewSeason,
                //size: size,

                resolve: {
                    options: function () { //esta es la info enviada al modal si se cargo correctamente. tb se puede info en el scope que abre el modal
                        return {
                            //dataDivision
                        };
                    }
                }
            });

            modalInstance.result.then(function (data) {
                //getTeams();
                vm.seasons = data;
                log('Changes Saved');
            }, function () {
            });
        }

        function openEditSeason(season) {
            
            var options = {};
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
                vm.seasons = dataUpdated;
                log('Changes Saved');

            }, function () {
            });
        }
  }]);

  var modalInstanceNewSeason = ['$scope', '$modalInstance', 'options', 'datacontext',
        function($scope, $modalInstance, options, datacontext) {
            $scope.ok = function () {
                var seasonValues = {};
                seasonValues.SeasonName = this.seasonName;
                seasonValues.Active = false;
                seasonValues.IsHidden = false;
                seasonValues.SeasonStart = this.seasonStart;
                seasonValues.SeasonEnd = this.seasonEnd;

                var dataUpdated = datacontext.addSeason(seasonValues);

                $modalInstance.close(dataUpdated);
            };
            $scope.cancel = function () { $modalInstance.dismiss('cancel'); };
        }];

    var modalInstanceEditSeason = ['$scope', '$modalInstance', 'datacontext', 'options', function ($scope, $modalInstance, datacontext, options) {

        var objSeason = options.season;
       
        $scope.seasonName = objSeason.SeasonName;
        $scope.seasonStart = objSeason.SeasonStart;
        $scope.seasonEnd = objSeason.SeasonEnd;
       
        $scope.ok = function () {
           
            objSeason.SeasonName = this.seasonName;
            objSeason.SeasonStart = this.seasonStart;
            objSeason.SeasonEnd = this.seasonEnd;

            var dataUpdated = datacontext.editSeason(objSeason);
            $modalInstance.close(dataUpdated);
        };
        $scope.cancel = function () { $modalInstance.dismiss('cancel'); };
    }];