'use strict';

/**
 * @ngdoc function
 * @name nvslonlineAppApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the nvslonlineAppApp
 */
angular.module('nvslonlineAppApp')
  .controller('HomeCtrl', ['$scope', '$modal', 'datacontext', 'toastr', 'webUrl', 
  function ($scope, $modal, datacontext, toastr, webUrl) {
    var vm = this; 

    vm.selectNew = selectNew;
    
    getNews();
     function getNews() {
           datacontext.getNews(webUrl).then(
            function (response) {
                console.log(response.data);
                vm.news = response.data;
                
                vm.selectTitle = vm.news[0].title;
                vm.selectDescription = vm.news[0].description;
                vm.selectModified = vm.news[0].modified;
            }, function(response) {
                toastr.error("Error has occurred: " + response.data.Message, "Fatal error", {
                positionClass: 'toast-bottom-full-width'
                })                
            });
     };

     function selectNew(objNew){
        vm.selectTitle = objNew.title;
        vm.selectDescription = objNew.description;
        vm.selectModified = objNew.modified;
     };
    
  }]);
