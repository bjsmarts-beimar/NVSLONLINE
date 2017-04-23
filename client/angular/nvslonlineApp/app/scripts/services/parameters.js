'use strict';

/**
 * @ngdoc service
 * @name nvslonlineAppApp.parameters
 * @description
 * # parameters
 * Factory in the nvslonlineAppApp.
 */
angular.module('nvslonlineAppApp')
  .factory('parameters', function () {
    // Service logic
    // ...

    var loginAccess = {
      user: "Beimar Medina",
      access:false
    };

    var requestSubject = [
      {Id: 1,subject:"General Inquiry"},
      {Id: 2,subject:"Advertise on NVSL, either on the site or via email"},
      {Id: 3,subject:"Player suspension review"},
      {Id: 4,subject:"Website Ideas and Suggestions"}
   ];

    // Public API here
    return {
      loginAccess: loginAccess,
      requestSubject: requestSubject
    };
  });
