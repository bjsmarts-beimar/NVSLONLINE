'use strict';

/**
 * @ngdoc function
 * @name nvslonlineAppApp.controller:ATeamCtrl
 * @description
 * # ATeamCtrl
 * Controller of the nvslonlineAppApp
 */
angular.module('nvslonlineAppApp')
  .controller('ATeamCtrl', ['$scope', '$modal', 'datacontext', 'toastr', 'webUrl', 
  function ($scope, $modal, datacontext, toastr, webUrl) {
    
        var vm = this;
        //vm.news = {
        //    title: 'Hot Towel Angular',
        //    description: 'Hot Towel Angular is a SPA template for Angular developers.'
        //};
        //vm.messageCount = 0;
        //vm.people = [];
        vm.title = 'Teams';
        vm.openNewTeam = openNewTeam;
        vm.openEditTeam = openEditTeam;
        vm.openDeleteTeam = openDeleteTeam;

        vm.getTeamsByDivision = getTeamsByDivision;
        //vm.getDivisionName = getDivisionName;

var indexedDivisions = [];

getTeams();
        function getTeams() {
            indexedDivisions = [];
            return datacontext.getTeams(webUrl).then(function (response) {
                console.log(response.data);
                vm.allTeams = response.data;
                return vm.teams =  response.data;
            });
        }

       /* $scope.teamsToFilter = function(){
            indexedDivisions = [];
            return datacontext.getTeams(webUrl).then(function (response) {
                console.log(response.data);
                vm.allTeams = response.data;
                return vm.teams =  response.data;
            });
        }
*/
        $scope.filterDivisions = function(team){
            var divisionIsNew = indexedDivisions.indexOf(team.Division.DivisionName)==-1;
            if(divisionIsNew){
                indexedDivisions.push(team.Division.DivisionName);
            }
            return divisionIsNew;
        }

        function getDivision() {
            return datacontext.getDivisions().then(function (data) {
                console.log(data);
                return vm.divisions = data;
            });
        }

        function openNewTeam() {
            var dataDivision = vm.divisions;
            var modalInstance = $modal.open({
                templateUrl: 'team.html',
                controller: modalInstanceNew,
                //size: size,

                resolve: {
                    options: function () { //esta es la info enviada al modal si se cargo correctamente. tb se puede info en el scope que abre el modal
                        return {
                            dataDivision
                        };
                    }
                }
            });

            modalInstance.result.then(function (data) {
                //getTeams();
                vm.allTeams = data;
                vm.teams = data;
                log('Changes Saved');
            }, function () {
            });
        }

        function openEditTeam(team) {
            var dataDivision = vm.divisions;
            var options = {};
            options.team = team;
            options.dataDivision = dataDivision;

            var modalInstance = $modal.open({
                templateUrl: 'team.html',
                controller: modalInstanceEdit,
                //size: size,

                resolve: {
                    options: function () { //esta es la info enviada al modal si se cargo correctamente. tb se puede info en el scope que abre el modal
                        return options;
                    }
                }
            });
            modalInstance.result.then(function (dataUpdated) {
                vm.allTeams = data;
                vm.teams = dataUpdated;
                log('Changes Saved');

            }, function () {
            });
        }

        function openDeleteTeam(team) {
            var modalInstance = $modal.open({
                templateUrl: 'delete.html',
                controller: modalInstanceDelete,
                //size: size,

                resolve: {
                    objTeam: function () { //esta es la info enviada al modal si se cargo correctamente. tb se puede info en el scope que abre el modal
                        return team;
                    }
                }
            });
            modalInstance.result.then(function (data) {
                vm.allTeams = data;
                vm.teams = data;
                log('Changes Saved');
            }, function () {
            });
        }

        function getTeamsByDivision(divisionId) {
            vm.teams = getLstTeamsByDivision(divisionId, vm.allTeams);
        }
  }]);

   var modalInstanceNew = ['$scope', '$modalInstance', 'options', 'datacontext',
       function ($scope, $modalInstance, options, datacontext) {
           //var vm = this;
           
           $scope.Divisions = options.dataDivision;
           //datacontext.getDivision().then(function(data) {         
           //    $scope.Divisions = data;
           //});

           $scope.ok = function () {
               var teamValues = {};
               teamValues.TeamName = this.teamName;
               teamValues.Division = this.division;
               teamValues.IsHidden = false;

               var dataUpdated = datacontext.addTeam(teamValues);

               $modalInstance.close(dataUpdated);
           };
           $scope.cancel = function () { $modalInstance.dismiss('cancel'); };
       }];

    var modalInstanceEdit = ['$scope', '$modalInstance', 'datacontext', 'options', function ($scope, $modalInstance, datacontext, options) {
         
        //datacontext.getDivision().then(function (data) {
        //    $scope.Divisions = data;
        //});
        var objTeam = options.team;
        $scope.Divisions = options.dataDivision;
        

        $scope.teamName = objTeam.TeamName;
        $scope.division = objTeam.DivisionId;
        
        $scope.ok = function () {
            console.log(objTeam);
               objTeam.TeamName = this.teamName;
               objTeam.DivisionId = this.division;

               var dataUpdated = datacontext.editTeam(objTeam);
               $modalInstance.close(dataUpdated);
           };
           $scope.cancel = function () { $modalInstance.dismiss('cancel'); };
    }];

    var modalInstanceDelete = ['$scope', '$modalInstance', 'datacontext', 'objTeam', function ($scope, $modalInstance, datacontext, objTeam) {
        console.log(objTeam);
        $scope.teamName = objTeam.TeamName;
        $scope.division = objTeam.Division.DivisionName;

        $scope.ok = function () {
            //objTeam.TeamName = this.teamName;
            //objTeam.Category = this.category;

            var dataUpdated = datacontext.deleteTeam(objTeam);
            //console.log(updated);
            $modalInstance.close(dataUpdated);
        };
        $scope.cancel = function () { $modalInstance.dismiss('cancel'); };
    }];
