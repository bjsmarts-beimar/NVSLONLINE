'use strict';

/**
 * @ngdoc function
 * @name nvslonlineAppApp.controller:AScheduleCtrl
 * @description
 * # AScheduleCtrl
 * Controller of the nvslonlineAppApp
 */
angular.module('nvslonlineAppApp')
  .controller('AScheduleCtrl', ['$scope', '$modal', 'datacontext', 'toastr', 'webUrl','common','$linq','parameters', '$location','$timeout',
  function ($scope, $modal, datacontext, toastr, webUrl, common, $linq, parameters,$location,$timeout) {
    
    var vm = this;
    common.accessLogin();
       
        vm.title = 'Schedule';

        vm.openNewSchedule = openNewSchedule;
        vm.openDeleteSchedule = openDeleteSchedule;
        vm.convertToDate = common.convertToDate;
        vm.convertToTime = common.convertToTime;
        vm.convertMomentDate = common.convertMomentDate;
        vm.convertMomentTime = common.convertMomentTime;
        vm.openEditScore = openEditScore;

        vm.getSeasonName = common.getSeasonName;
        vm.getDivisionName = common.getDivisionName;

        getSchedule();
        getTeams();
        getDivision();
        getSeasonNoActive();
        getVenues();
        function getSchedule() {
            return datacontext.getSchedules(webUrl).then(function (response) {
                console.log(response.data);
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
            options.webUrl = webUrl;
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
                getSchedule();
            }, function () {
            });
        }

        function openEditScore(schedule) {
            
            var options = {};
            options.schedule = schedule;
            options.webUrl = webUrl;

            var modalInstance = $modal.open({
                templateUrl: 'score.html',
                controller: modalInstanceEditScore,
                
                resolve: {
                    options: function () { //esta es la info enviada al modal si se cargo correctamente. tb se puede info en el scope que abre el modal
                        return options;
                    }
                }
            });
            modalInstance.result.then(function () {
                getSchedule();
            }, function () {
            });
        }

        function openDeleteSchedule(schedule) {
            var options = {};
            options.webUrl = webUrl;
            options.schedule = schedule;

            var modalInstance = $modal.open({
                templateUrl: 'delete.html',
                controller: modalInstanceDeleteSchedule,
                //size: size,

                resolve: {
                    options: function () { //esta es la info enviada al modal si se cargo correctamente. tb se puede info en el scope que abre el modal
                        return options;
                    }
                }
            });
            modalInstance.result.then(function (data) {
               getSchedule();
            }, function () {
            });
        }

  }]);

   var modalInstanceNewSchedule = ['$scope', '$modalInstance', 'options', 'datacontext','common','$q','$linq','parameters','$timeout',
       function ($scope, $modalInstance, options, datacontext, common, $q, $linq,parameters,$timeout) {
           $scope.Seasons = options.dataSeason;
           //$scope.Teams = options.dataTeams;
           var teams = options.dataTeams;
           var venues = options.dataVenues;
           var schedules = options.dataSchedules;

           $scope.seasonFilter = function(){
            
            var lstDivisionComplete1 = $linq.Enumerable().From(teams)
               .Where("p => p.SeasonId ==" + this.season)
               .Select()
               .ToArray();
               
               var lstDivisionExcept1 = $linq.Enumerable().From(schedules)
               .Where("p => p.SeasonId ==" + this.season)
               .Select("s => s.DivisionId")
               .ToArray();
               
               var lstDivision1 = $linq.Enumerable()
               .From(lstDivisionComplete1)
               .Where(function(p){
                  return !$linq.Enumerable().From(lstDivisionExcept1).Contains(p.DivisionId)
               })
              
               .ToArray();
               $scope.Teams = lstDivision1;
           }

           

           $scope.ok = function () {
            season = this.season;

            var $d = $q.defer();
            var promesas = [];

            var seasons = options.dataSeason;
            var teams = options.dataTeams;
            
               
               var objSeason = $linq.Enumerable().From(seasons).Where("p => p.Id ==" + season).Select().FirstOrDefault();
               var lstDivision = $linq.Enumerable().From($scope.Teams)
               .Where("p => p.SeasonId ==" + season)
               .GroupBy("g => g.DivisionId")
               .Select("Group => Group.FirstOrDefault()")
               //.Select("s => s.DivisionId")
               .ToArray();
 
               var seasonStart = new Date(objSeason.SeasonStart);
               var seasonEnd = new Date(objSeason.SeasonEnd);

               var countFourTeamForDivision = 0;// esta variable verifica si se ingresaron 4 equipos por divisions
               for (var l = 0; l < lstDivision.length; l++) {
                        var teamsDivision  = $linq.Enumerable().From($scope.Teams)
                            .Where("p => p.DivisionId ==" + lstDivision[l].DivisionId)
                            .ToArray();

                   if (teamsDivision.length >= 4) {
                         countFourTeamForDivision += 1;// si se ingresaron 4 equipos por divisions la temporada quedara completa
                        
                         var ranVenues = common.shuffle(venues);
                        
                         if (ranVenues.length === 0) {
                             $scope.error_message = parameters.error_message.noVenuesFound;
                             return;
                         }
                         

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

                                        scheduleValues.DivisionId = lstDivision[l].DivisionId;
                                        scheduleValues.SeasonId = season;

                                        scheduleValues.GoalsHomeTeam = null;
                                        scheduleValues.GoalsAwayTeam = null;
                                        scheduleValues.IsHidden = false;

                                        var encontrado = false;


                                        while (encontrado === false) {
                                            var ranFecha = common.randomDate(seasonStart, seasonEnd);
                                            
                                            if (ranFecha.getDay() === 0) {
                                                if (countPartidos % 2 === 0) {
                                                    ranFecha.setHours(14, 0, 0);
                                                    scheduleValues.DateTime = ranFecha.toISOString();
                                                    encontrado = true;

                                                } else {
                                                    ranFecha.setHours(10, 0, 0);
                                                    scheduleValues.DateTime = ranFecha.toISOString();
                                                    encontrado = true;
                                                }
                                            }
                                        }
                                        
                                          var promesa =  datacontext.addSchedule(options.webUrl,scheduleValues);
                                          promesas.push(promesa);
                                    }
                                }
                            }

                  }
               }

               $q.all(promesas).then(function(promesasRes){
                      $d.resolve(promesasRes);
                      //console.log("terminado");
                      $modalInstance.close();
                  }) 
           };
                      



           $scope.cancel = function () { $modalInstance.dismiss('cancel'); };
       }];

   var modalInstanceEditScore = ['$scope', '$modalInstance', 'datacontext', 'options', 
       function ($scope, $modalInstance, datacontext, options) {

        var objSchedule = options.schedule;
        $scope.objSchedule = objSchedule;
        $scope.goalsHomeTeam = objSchedule.GoalsHomeTeam;
        $scope.goalsAwayTeam = objSchedule.GoalsAwayTeam;

        $scope.ok = function () {
            objSchedule.GoalsHomeTeam = this.goalsHomeTeam;
            objSchedule.GoalsAwayTeam = this.goalsAwayTeam;
            
            return datacontext.editScore(options.webUrl, objSchedule).then(function (response) {
               $modalInstance.close();
            });
            //datacontext.editScore(options.webUrl, objSchedule);
            //$modalInstance.close();
        };
        $scope.cancel = function () { $modalInstance.dismiss('cancel'); };
    }];

    var modalInstanceDeleteSchedule = ['$scope', '$modalInstance', 'datacontext', 'options', 'common','$q',
        function ($scope, $modalInstance, datacontext, options,common,$q) {
        console.log(options);
        $scope.teams = options.schedule;
        $scope.division = options.schedule[0].Division.DivisionName;
        $scope.convertMomentDate = common.convertMomentDate;
        $scope.convertMomentTime = common.convertMomentTime;
        
        $scope.ok = function () {
            var $d = $q.defer();
            var promesas = [];
            for (var l = 0; l < $scope.teams.length; l++) {
                var promesa =  datacontext.deleteSchedule(options.webUrl,$scope.teams[l]);
                promesas.push(promesa);
            }
             $q.all(promesas).then(function(promesasRes){
                      $d.resolve(promesasRes);
                      //console.log("terminado");
                      $modalInstance.close();
                  }) 

        };
        $scope.cancel = function () { $modalInstance.dismiss('cancel'); };
    }];
