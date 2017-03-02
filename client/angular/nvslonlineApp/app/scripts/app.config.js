
angular.module('nvslonlineAppApp').value("webUrl", "http://pc-sp20131/nvslonlineApi/")

angular.module('nvslonlineAppApp').value("debug", true)

angular.module('nvslonlineAppApp').config(function($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
    .state('main', {
        url: '/',
        templateUrl: '/views/main.html'
    })
    .state('division', {
        url: '/division',
        templateUrl: '/views/division.html',
        controller: 'DivisionCtrl as vm'
    })
    .state('register', {
        url: '/register',
        templateUrl: '/views/register.html',
        controller: 'RegisterCtrl'
    });
})