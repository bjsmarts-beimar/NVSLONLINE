'use strict';

/**
 * @ngdoc service
 * @name nvslonlineAppApp.parameters
 * @description
 * # parameters
 * Factory in the nvslonlineAppApp.
 */
angular.module('nvslonlineAppApp')
  .factory('parameters', function ($rootScope,$timeout) {
    // Service logic
    // ...

    var loginAccess = {
      user:"",
      access : false
    };

    var requestSubject = [
      {Id: 1,subject:"General Inquiry"},
      {Id: 2,subject:"Advertise on NVSL, either on the site or via email"},
      {Id: 3,subject:"Player suspension review"},
      {Id: 4,subject:"Website Ideas and Suggestions"}
   ];

   var pagination = {
     currentPage : 1, //pagina inicial
     itemsPerPage : 10,//cantidad de records por pagina
     maxSize : 10//cantidad maxima de botones de paginacion
   }

   var error_message = {
     noPlayersTeam : "No players for this Team",
     noVenuesFound : "Game Venues not found",
     passNoCoinciden : "Passwords do not match",
     userPassIncorrect : "Username or Password incorrect",
     errorRegister : "An error has occurred can not be registered",
   }

    // Public API here
    /*return {
      loginAccess: loginAccess,
      requestSubject: requestSubject,
      pagination: pagination,
      error_message:error_message
    };*/

      return {
      getLoginAccess : function(){
        return loginAccess;
      },
      setLoginAccess : function(user, access){
        loginAccess.user = user;
        loginAccess.access = access;
      $timeout(function(){
          $rootScope.$broadcast("update");
        },0)
      },
      
      requestSubject: requestSubject,
      pagination: pagination,
      error_message:error_message
    };
  });
