'use strict';

/**
 * @ngdoc function
 * @name nvslonlineAppApp.controller:AScheduleCtrl
 * @description
 * # AScheduleCtrl
 * Controller of the nvslonlineAppApp
 */
angular.module('nvslonlineAppApp')
  .controller('AScheduleCtrl', ['$scope', '$modal', 'datacontext', 'toastr', 'webUrl','common','$linq', 
  function ($scope, $modal, datacontext, toastr, webUrl, common, $linq) {
    
    var vm = this;
        //vm.news = {
        //    title: 'Hot Towel Angular',
        //    description: 'Hot Towel Angular is a SPA template for Angular developers.'
        //};
        //vm.messageCount = 0;
        //vm.people = [];
        vm.title = 'Schedule';

        vm.openNewSchedule = openNewSchedule;
        vm.openDeleteSchedule = openDeleteSchedule;
        vm.convertToDate = common.convertToDate;
        vm.convertToTime = common.convertToTime;

       // vm.getDivisionName = getDivisionName;
        //vm.getSeasonName = getSeasonName;

        getSchedule();
        getTeams();
        getDivision();
        getSeasonNoActive();
        getVenues();
        function getSchedule() {
            return datacontext.getSchedules(webUrl).then(function (response) {
                //console.log(data);
                return vm.schedules = response.data;
            });
        }
        
        function getTeams() {
            return datacontext.getTeams(webUrl).then(function (response) {
                //console.log(data);
                return vm.teams = response.data;
            });
        }

        function getDivision() {
            return datacontext.getDivisions(webUrl).then(function (response) {
                //console.log(data);
                return vm.divisions = response.data;
            });
        }

        function getSeasonNoActive() {
            return datacontext.getSeasonNoActive(webUrl).then(function (response) {
                return vm.seasonNoActive = response.data;
            });
        }

        function getVenues() {
            return datacontext.getVenues(webUrl).then(function (response) {
                //console.log(data);
                return vm.venues = response.data;
            });
        }


        function openNewSchedule() {

            var options = {};
            options.dataDivision = vm.divisions;
            options.dataSeason = vm.seasonNoActive;
            options.dataVenues = vm.venues;
            options.dataTeams = vm.teams;
            options.dataSchedules = vm.schedules;

            var modalInstance = $modal.open({
                templateUrl: 'schedule.html',
                controller: modalInstanceNewSchedule,
                //size: size,

                resolve: {
                    options: function () { //esta es la info enviada al modal si se cargo correctamente. tb se puede info en el scope que abre el modal
                        return options;
                    }
                }
            });

            modalInstance.result.then(function (data) {
                options.dataSeason = getSeasonNoActive();
                vm.schedules = data;
                //getSchedule();
                log('Changes Saved');
            }, function () {
            });
        }

        function openDeleteSchedule(schedule) {
            var modalInstance = $modal.open({
                templateUrl: 'delete.html',
                controller: modalInstanceDeleteSchedule,
                //size: size,

                resolve: {
                    options: function () { //esta es la info enviada al modal si se cargo correctamente. tb se puede info en el scope que abre el modal
                        return schedule;
                    }
                }
            });
            modalInstance.result.then(function (data) {
               // vm.teams = data;
                log('Changes Saved');
            }, function () {
            });
        }

  }]);

   var modalInstanceNewSchedule = ['$scope', '$modalInstance', 'options', 'datacontext','$q','$linq',
       function ($scope, $modalInstance, options, datacontext, $q, $linq) {
           $scope.Seasons = options.dataSeason;
           $scope.Teams = options.dataTeams;
           var teams = options.dataTeams;
           var venues = options.dataVenues;
           var schedules = options.dataSchedules;

           //var teamGroup = Enumerable.From(options.dataTeams)
           //     //.SelectMany("teams => teams.DivisionId")
           //     //.GroupBy("DivisionId => DivisionId
           //    .GroupBy("division => division.DivisionId")
           //     .ToArray();

          /* var teamGroup = Enumerable.From(options.dataTeams).GroupBy("division => division.DivisionId", null,
                function (key, g) {
                    var result = {
                        divisionId: key,
                        total: g.Count("teams => teams.Id")
                    }
                    return result;
                }).ToArray();

           var divisionTeams = Enumerable.From(options.dataDivision)
                            .Join(
                                teamGroup,
                                "division => division.Id",
                                "teamGroup => teamGroup.divisionId",
                                "(division, teamGroup) => { Id: division.Id, DivisionName: division.DivisionName, CountTeam: teamGroup.total }"
                            ).ToArray();

           $scope.divisionTeams = divisionTeams;
           
           $scope.getTeamsDivisionBySeason = function(seasonId) {

               var schedulesBySeason = getSearchScheduleBySeason(seasonId, schedules);

               var lstScheduleDivision = Enumerable.From(schedulesBySeason)
                            .Join(
                                teamGroup,
                                "division => division.DivisionId",
                                "teamGroup => teamGroup.divisionId",
                                "(division, teamGroup) => { Id: division.DivisionId, DivisionName: division.Division.DivisionName, CountTeam: teamGroup.total }"
                            ).ToArray();
               console.log(lstScheduleDivision);
               var arrayDivision = Enumerable.From(lstScheduleDivision).Distinct("p => p.Id").ToArray();
               console.log(arrayDivision);

               var array1 = divisionTeams;
               var array2 = arrayDivision;
               
               $scope.divisionTeams = Enumerable.From(array1)
               .Except(array2, "array => [array.Id, array.DivisionName].join(':')")
               .ToArray();
              
               var count = 0;
               var countFourTeam = 0;
               for (var i = 0; i < $scope.divisionTeams.length; i++) {
                   if ($scope.divisionTeams[i].CountTeam >= 4) {
                       count += 1;
                   }
                   if ($scope.divisionTeams[i].CountTeam < 4) {
                       countFourTeam += 1;
                   }
               }
               
               $scope.teamsValidate = true;
               if (count > 0) {
                   $scope.teamsValidate = false;
               }

               $scope.teamsMessage = false;
               if (countFourTeam > 0) {
                   $scope.teamsMessage = true;
               }
               
           }
*/

           $scope.ok = function () {
console.log($scope.body);

               
               var objSeason = $linq.Enumerable().From(options.dataSeason).Where("p => p.Id ==" + this.season).Select().FirstOrDefault();
               console.log(objSeason);
/*
               var seasonStart = new Date(objSeason.SeasonStart);
               var seasonEnd = new Date(objSeason.SeasonEnd);

               var countFourTeamForDivision = 0;
               for (var l = 0; l < $scope.divisionTeams.length; l++) {
                   
                   var teamsDivision  = Enumerable.From(teams)
                            .Where("p => p.DivisionId ==" + $scope.divisionTeams[l].Id)
                            .ToArray();
                  
                   if (teamsDivision.length >= 4) {
                       countFourTeamForDivision += 1;
                       //console.log(teamsDivision);
                       // console.log("***********************************************************************************************");
                       var ranVenues = shuffle(venues);

                       var indexVenues = 0;
                       var countPartidos = 0;
                       for (var j = 0; j < teamsDivision.length; j++) {
                           for (var k = j; k < teamsDivision.length; k++) {
                               if (teamsDivision[j].Id !== teamsDivision[k].Id) {

                                   countPartidos += 1;
                                   var scheduleValues = {};

                                   var ranTeams = Math.floor((Math.random() * 2) + 1);

                                   if (ranTeams === 1) {
                                       scheduleValues.HomeTeamId = teamsDivision[j].Id;
                                       scheduleValues.AwayTeamId = teamsDivision[k].Id;
                                   } else {
                                       scheduleValues.HomeTeamId = teamsDivision[k].Id;
                                       scheduleValues.AwayTeamId = teamsDivision[j].Id;
                                   }

                                   if (ranVenues[indexVenues] == undefined) {
                                       indexVenues = 0;
                                       scheduleValues.VenueId = ranVenues[indexVenues].Id;
                                   } else {
                                       scheduleValues.VenueId = ranVenues[indexVenues].Id;
                                       indexVenues += 1;
                                   }

                                   scheduleValues.Status = "Scheduled";

                                   scheduleValues.DivisionId = $scope.divisionTeams[l].Id;
                                   scheduleValues.SeasonId = this.season;

                                   scheduleValues.GoalsHomeTeam = null;
                                   scheduleValues.GoalsAwayTeam = null;
                                   scheduleValues.IsHidden = false;

                                   var encontrado = false;
                                   while (encontrado === false) {
                                       var ranFecha = randomDate(seasonStart, seasonEnd);

                                       if (ranFecha.getDay() === 0) {
                                           if (countPartidos % 2 === 0) {
                                               ranFecha.setHours(14, 0, 0);
                                               scheduleValues.DateTime = ranFecha;
                                               encontrado = true;

                                           } else {
                                               ranFecha.setHours(10, 0, 0);
                                               scheduleValues.DateTime = ranFecha;
                                               encontrado = true;
                                           }
                                       }
                                   }

                                    datacontext.addSchedule(scheduleValues);

                               }

                           }
                       }
                   }
                   
               }
               //if ($scope.divisionTeams.length === countFourTeamForDivision) {
               //    var objSeasonActive = {};
               //    objSeasonActive.Id = this.season;
               //    objSeasonActive.Active = true;
               //    datacontext.editSeasonActive(objSeasonActive);
                   
               //}
               datacontext.getSchedule().then(function (data) {
                   //console.log(data);
                   //vm.schedules = data;
                   $modalInstance.close(data);
               });
*/
           };

           $scope.cancel = function () { $modalInstance.dismiss('cancel'); };
       }];

    var modalInstanceDeleteSchedule = ['$scope', '$modalInstance', 'datacontext', 'options', function ($scope, $modalInstance, datacontext, options) {
        console.log(options);
        //$scope.teamName = objTeam.TeamName;
        //$scope.division = objTeam.Division.DivisionName;

        $scope.ok = function () {
            //objTeam.TeamName = this.teamName;
            //objTeam.Category = this.category;

            var dataUpdated = datacontext.deleteTeam(objTeam);
            //console.log(updated);
            $modalInstance.close(dataUpdated);
        };
        $scope.cancel = function () { $modalInstance.dismiss('cancel'); };
    }];
