'use strict';

/**
 * @ngdoc service
 * @name nvslonlineAppApp.datacontext
 * @description
 * # datacontext
 * Service in the nvslonlineAppApp.
 */
angular.module('nvslonlineAppApp')
  .service('datacontext', function ($http) {
    
    this.getDivisions = function (webUrl) {
        return $http({
            method: 'GET',
            withCredentials: true,
            data: 'json',
            url: webUrl +  'api/divisions'
        });
    };
  });
