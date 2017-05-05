'use strict';

/**
 * @ngdoc function
 * @name nvslonlineAppApp.controller:APlayerCtrl
 * @description
 * # APlayerCtrl
 * Controller of the nvslonlineAppApp
 */
angular.module('nvslonlineAppApp')
  .controller('APlayerCtrl', ['$scope', '$modal', 'datacontext', 'toastr', 'webUrl','parameters','$location','common',
  function ($scope, $modal, datacontext, toastr, webUrl, parameters, $location, common) {
   var vm = this; 
    common.accessLogin();
    vm.openNewPlayer = openNewPlayer;
    vm.openEditPlayer = openEditPlayer;
    vm.openDeletePlayer = openDeletePlayer;

    vm.playersToFilter = playersToFilter;
    vm.filterTeams = filterTeams;
    vm.search = search;

    getPlayers();
    getTeams();
        
     function getTeams() {
            return datacontext.getTeams(webUrl).then(function (response) {
                vm.allTeams = response.data;
                return vm.teams =  response.data;
            });
        }


     vm.currentPage = parameters.pagination.currentPage; //pagina actual
     vm.itemsPerPage = parameters.pagination.itemsPerPage;//cantidad de records por pagina
     vm.maxSize = parameters.pagination.maxSize;//cantidad maxima de botones de paginacion
     function getPlayers() {
           datacontext.getPlayers(webUrl).then(
            function (response) {
                vm.players = response.data;

                vm.displayPlayers = vm.players.slice(((vm.currentPage-1)*vm.itemsPerPage),((vm.currentPage)*vm.itemsPerPage)); 
                console.log(vm.displayPlayers);
            }, function(response) {
                toastr.error("Error has occurred: " + response.data.Message, "Fatal error", {
                positionClass: 'toast-bottom-full-width'
                })                
            });
     };

     

     var indexedTeams = [];
     function playersToFilter(){
        indexedTeams = [];
        return vm.players;
     }
     function filterTeams (player){
        var teamIsNew = indexedTeams.indexOf(player.TeamId) == -1;
        if(teamIsNew){
          indexedTeams.push(player.TeamId);
        }
        return teamIsNew;
    }

    function search (row) {
        
     return !!((row.FirstName.indexOf($scope.team || '') !== -1 || row.LastName.indexOf($scope.team || '') !== -1));
};

     function openNewPlayer() {   
            var options = {};
            options.webUrl = webUrl;
            options.teams = vm.teams;

            var modalInstance = $modal.open({
                templateUrl: 'player.html',
                controller: modalInstanceNewPlayer ,
                controllerAs: vm,
                //size: size,

                resolve: {
                    options: function () { //esta es la info enviada al modal si se cargo correctamente. tb se puede info en el scope que abre el modal
                        return options;
                    }
                }
            });

            modalInstance.result.then(function (data) {
               getPlayers();
            }, function () {
            });
        }  

   function openEditPlayer(player) {
            
            var options = {};
            options.player = player;
            options.webUrl = webUrl;
            options.teams = vm.teams;
           
            var modalInstance = $modal.open({
                templateUrl: 'player.html',
                controller: modalInstanceEditPlayer,
                //size: size,

                resolve: {
                    options: function () { //esta es la info enviada al modal si se cargo correctamente. tb se puede info en el scope que abre el modal
                        return options;
                    }
                }
            });
            modalInstance.result.then(function (dataUpdated) {
                getPlayers();
                //log('Changes Saved');

            }, function () {
            });
        }

      function openDeletePlayer(player) {
            var options = {};
            options.player = player;
            options.webUrl = webUrl;

            var modalInstance = $modal.open({
                templateUrl: 'delete.html',
                controller: modalInstanceDeletePlayer,
                //size: size,

                resolve: {
                    options: function () { //esta es la info enviada al modal si se cargo correctamente. tb se puede info en el scope que abre el modal
                        return options;
                    }
                }
            });
            modalInstance.result.then(function (data) {
               getPlayers();
            }, function () {
            });
        } 

  }]);


  var modalInstanceNewPlayer = ['$scope', '$modalInstance', 'options', 'datacontext',
       function ($scope, $modalInstance, options, datacontext) {
          console.log(options);
           $scope.teams = options.teams;
           $scope.ok = function () {
               var playerValues = {};
               playerValues.FirstName = this.firstName;
               playerValues.LastName = this.lastName;
               playerValues.IsHidden = false;
               playerValues.TeamId = this.team;
               var dataUpdated = datacontext.addPlayer(options.webUrl,playerValues);

               $modalInstance.close(dataUpdated);
           };
           $scope.cancel = function () { $modalInstance.dismiss('cancel'); };
       }];

  var modalInstanceEditPlayer = ['$scope', '$modalInstance', 'datacontext', 'options', 
  function ($scope, $modalInstance, datacontext, options) {
        $scope.teams = options.teams;
        var objPlayer = options.player;
        $scope.firstName = objPlayer.FirstName;
        $scope.lastName = objPlayer.LastName;
        $scope.team = objPlayer.TeamId;
       
        $scope.ok = function () {
            
            objPlayer.FirstName = this.firstName;
            objPlayer.LastName = this.lastName;
            objPlayer.TeamId = this.team;
            var dataUpdated = datacontext.editPlayer(options.webUrl,objPlayer);
            $modalInstance.close(dataUpdated);
        };
        $scope.cancel = function () { $modalInstance.dismiss('cancel'); };
    }];

  var modalInstanceDeletePlayer = ['$scope', '$modalInstance', 'datacontext', 'options', function ($scope, $modalInstance, datacontext, options) {
    
        var objPlayer = options.player;

        $scope.firstName = objPlayer.FirstName;
        $scope.lastName = objPlayer.LastName;
        
        $scope.ok = function () {
            
            var dataUpdated = datacontext.deletePlayer(options.webUrl,objPlayer);
            //console.log(updated);
            $modalInstance.close(dataUpdated);
        };
        $scope.cancel = function () { $modalInstance.dismiss('cancel'); };
    }];
 