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

    // Public API here
    return {
      loginAccess: loginAccess
    };
  });
