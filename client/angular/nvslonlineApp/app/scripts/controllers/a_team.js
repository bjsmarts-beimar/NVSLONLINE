'use strict';

/**
 * @ngdoc function
 * @name nvslonlineAppApp.controller:ATeamCtrl
 * @description
 * # ATeamCtrl
 * Controller of the nvslonlineAppApp
 */
angular.module('nvslonlineAppApp')
  .controller('ATeamCtrl', ['$scope', '$modal', 'datacontext', 'toastr', 'webUrl','parameters','$location','common',
  function ($scope, $modal, datacontext, toastr, webUrl, parameters, $location, common) {
    
        var vm = this;
        common.accessLogin();       
        vm.title = 'Teams';
        vm.openNewTeam = openNewTeam;
        vm.openEditTeam = openEditTeam;
        vm.openDeleteTeam = openDeleteTeam;

        vm.getTeamsByDivision = getTeamsByDivision;
        //vm.getDivisionName = getDivisionName;

    

        //carga inicial de data
        getTeams();
        getDivision();
        getSeason();

        function getTeams() {
            return datacontext.getTeams(webUrl).then(function (response) {
                vm.allTeams = response.data;
                return vm.teams =  response.data;
            });
        }

        /*var indexedDivisions = [];
        $scope.teamsToFilter = function(){
            indexedDivisions.length = 0;
            return vm.teams;
        }
        $scope.filterDivisions = function(team){
            var divisionIsNew = indexedDivisions.indexOf(team.DivisionId)==-1;
            if(divisionIsNew){
                indexedDivisions.push(team.DivisionId);
            }
            return divisionIsNew;
        }*/

        function getDivision() {
            return datacontext.getDivisions(webUrl).then(function (response) {
                return vm.divisions = response.data;
            });
        }

        function getSeason() {
            return datacontext.getSeasons(webUrl).then(function (response) {
                return vm.seasons = response.data;
            });
        }

        function openNewTeam() {
            var dataDivision = vm.divisions;
            var dataSeason = vm.seasons;
            
            var options = {};
            options.dataDivision = dataDivision;
            options.dataSeason = dataSeason;
            options.webUrl = webUrl;

            var modalInstance = $modal.open({
                templateUrl: 'team.html',
                controller: modalInstanceNewTeam,
                //size: size,

                resolve: {
                    options: function () { //send to modal
                        return options;                       
                    }
                }
            });

            modalInstance.result.then(function (data) {
                getTeams();
                //vm.allTeams = data;
               // vm.teams = data;
                //log('Changes Saved');
            }, function () {
            });
        }

        function openEditTeam(team) {
            var options = {};
            options.team = team;
            options.dataDivision = vm.divisions;
            options.dataSeason = vm.seasons;
            options.webUrl = webUrl;

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
                getTeams();
            }, function () {
            });
        }

        function openDeleteTeam(team) {
            var options = {};
            options.team = team;
            options.webUrl = webUrl;

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
                //vm.allTeams = data;
                //vm.teams = data;
                getTeams();
                //log('Changes Saved');
            }, function () {
            });
        }

        function getTeamsByDivision(divisionId) {
            vm.teams = getLstTeamsByDivision(divisionId, vm.allTeams);
        }
  }]);

   var modalInstanceNewTeam = ['$scope', '$modalInstance', 'options', 'datacontext','toastr',
       function ($scope, $modalInstance, options, datacontext, toastr) {
           
           $scope.Divisions = options.dataDivision;
           $scope.Seasons = options.dataSeason;

           $scope.ok = function () {
               var teamValues = {};
               teamValues.TeamName = this.teamName;
               teamValues.DivisionId = this.division;
               teamValues.SeasonId = this.season;
               teamValues.IsHidden = false;

               datacontext.addTeam(options.webUrl,teamValues).then(function (response) {
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

    var modalInstanceEdit = ['$scope', '$modalInstance', 'datacontext', 'options', 'toastr',
    function ($scope, $modalInstance, datacontext, options,toastr) {
         
        var objTeam = options.team;
        $scope.Divisions = options.dataDivision;
        $scope.Seasons = options.dataSeason;

        $scope.teamName = objTeam.TeamName;
        $scope.division = objTeam.DivisionId;
        $scope.season = objTeam.SeasonId;
        
        var aux = JSON.parse(JSON.stringify(objTeam));
        $scope.ok = function () {
               objTeam.TeamName = this.teamName;
               objTeam.DivisionId = this.division;
               objTeam.SeasonId = this.season;

                datacontext.editTeam(options.webUrl,objTeam).then(function (response) {
                   if (response.status!=200) {
                       toastr.error("Error has occurred: " + response.data, "Fatal error", {
                        positionClass: 'toast-bottom-full-width'})
                        objTeam.TeamName=aux.TeamName;
                        objTeam.DivisionId=aux.DivisionId;
                        objTeam.SeasonId=aux.SeasonId;
                   }else{
                       $modalInstance.close(response);
                   }
                });
               
           };
           $scope.cancel = function () { $modalInstance.dismiss('cancel'); };
    }];

    var modalInstanceDelete = ['$scope', '$modalInstance', 'datacontext', 'options',
    function ($scope, $modalInstance, datacontext, options) {
        console.log(options);
        var objTeam = options.team;
        $scope.teamName = objTeam.TeamName;
        $scope.division = objTeam.Division.DivisionName;

        $scope.ok = function () {
            //objTeam.TeamName = this.teamName;
            //objTeam.Category = this.category;

            var dataUpdated = datacontext.deleteTeam(options.webUrl,objTeam);
            //console.log(updated);
            $modalInstance.close(dataUpdated);
        };
        $scope.cancel = function () { $modalInstance.dismiss('cancel'); };
    }];
