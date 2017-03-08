'use strict';

/**
 * @ngdoc service
 * @name nvslonlineAppApp.common
 * @description
 * # common
 * Service in the nvslonlineAppApp.
 */
angular.module('nvslonlineAppApp')
  .service('common', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function

    this.convertToTime = function(stringDate) {
    var d = new Date(stringDate),
        h = (d.getHours() < 10 ? '0' : '') + d.getHours(),
        m = (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
    return  h + ':' + m;
    };

   this.convertToDate = function(stringDate) {
     
    var dateOut = new Date(stringDate);
    dateOut.setDate(dateOut.getDate());
    return dateOut;
  };

  });
