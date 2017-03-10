'use strict';

/**
 * @ngdoc function
 * @name nvslonlineAppApp.controller:AScheduleCtrl
 * @description
 * # AScheduleCtrl
 * Controller of the nvslonlineAppApp
 */
angular.module('nvslonlineAppApp')
  .controller('AScheduleCtrl', ['$scope', '$modal', 'datacontext', 'toastr', 'webUrl', 
  function ($scope, $modal, datacontext, toastr, webUrl) {
    
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
        vm.convertToDate = convertToDate;
        vm.convertToTime = convertToTime;

        vm.getDivisionName = getDivisionName;
        vm.getSeasonName = getSeasonName;

        function getSchedule() {
            return datacontext.getSchedule().then(function (data) {
                //console.log(data);
                return vm.schedules = data;
            });
        }
        
        function getTeams() {
            return datacontext.getTeams().then(function (data) {
                //console.log(data);
                return vm.teams = data;
            });
        }

        function getDivision() {
            return datacontext.getDivision().then(function (data) {
                //console.log(data);
                return vm.divisions = data;
            });
        }

        function getSeasonNoActive() {
            return datacontext.getSeasonNoActive().then(function (data) {
                return vm.seasonNoActive = data;
            });
        }

        function getVenues() {
            return datacontext.getVenues().then(function (data) {
                //console.log(data);
                return vm.venues = data;
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
