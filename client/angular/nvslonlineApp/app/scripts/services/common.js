'use strict';

/**
 * @ngdoc service
 * @name nvslonlineAppApp.common
 * @description
 * # common
 * Service in the nvslonlineAppApp.
 */
angular.module('nvslonlineAppApp')
  .service('common', function (parameters,$location,$linq) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    this.randomDate = function(start, end){
      return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    };

    this.randomNumber = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    this.convertToTime = function(stringDate) {
       
      var d = new Date(stringDate),
          h = (d.getHours() < 10 ? '0' : '') + d.getHours(),
          m = (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
          
      return  h + ':' + m;
    };

    this.convertMomentTime = function(stringDate) {
       return moment(stringDate).format('LT');
    };

    this.convertMomentDate = function(stringDate) {
       return moment(stringDate).format('L');
    };

    this.successResponse = function(response) {
        var oResponse = {
          success:true,
          response : response
        };
       return oResponse;
    };
    this.errorResponse = function(response) {
        var oResponse = {
         success:false,
         response : response
        };
       return oResponse;
    };

   this.convertToDate = function(stringDate) {
      var dateOut = new Date(stringDate);
      dateOut.setDate(dateOut.getDate()+1);
      return dateOut;
    };

    this.convertToDate2 = function(stringDate) {
      var dateOut = new Date(stringDate);
      dateOut.setDate(dateOut.getDate()+1);
      return dateOut;
    };

    this.length_message = function(array,message) {
      if (array.length === 0) {
          return message;
      }
    };

    this.accessLogin = function() {
       if (parameters.getLoginAccess().access !== true ) {
        $location.path('/home');
      }
    };

    this.shuffle = function(array){
      var currentIndex = array.length,temporaryValue,randomIndex;
      //While there remain elements to shuffle..
      while(0!==currentIndex){
        //Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        //and swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      return array;
    };

    this.getSeasonName = function(seasonId,lstSeasons){
                  var objSeason  = $linq.Enumerable().From(lstSeasons)
                            .Where("p => p.SeasonId ==" + seasonId)
                            .FirstOrDefault();
                  return objSeason.Season.SeasonName;
    }

    this.getDivisionName = function(divisionId,lstDivisions){
                  var objDivision  = $linq.Enumerable().From(lstDivisions)
                            .Where("p => p.DivisionId ==" + divisionId)
                            .FirstOrDefault();
                  return objDivision.Division.DivisionName;
    }

  });
