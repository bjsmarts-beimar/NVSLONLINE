'use strict';
//angular.module('nvslonlineAppApp').value("webUrl", "http://pc-sp20131/nvslonlineApi/")
angular.module('nvslonlineAppApp').value("webUrl", "http://localhost:8000/")

angular.module('nvslonlineAppApp').value("debug", true)

angular.module('nvslonlineAppApp').config(function($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
    .state('main', {
        url: '/',
        templateUrl: '/views/main.html'
    })
    .state('team', {
        url: '/team',
        templateUrl: '/views/team.html',
        controller: 'TeamCtrl as vm'
    })
    .state('schedule', {
        url: '/schedule',
        templateUrl: '/views/schedule.html',
        controller: 'ScheduleCtrl as vm'
    })
    .state('standing', {
        url: '/standings',
        templateUrl: '/views/standing.html',
        controller: 'StandingCtrl as vm'
    })
    .state('division', {
        url: '/division',
        templateUrl: '/views/division.html',
        controller: 'DivisionCtrl as vm'
    })

    .state('login', {
        url: '/login',
        templateUrl: '/views/login.html',
        controller: 'LoginCtrl as vm'
    })

    /********************* ADMIN USER ******************/

    .state('adminDivision', {
        url: '/ADivision',
        templateUrl: '/views/a_division.html',
        controller: 'ADivisionCtrl as vm'
    })


    /***************** CONTRIBUIDOR USER ***************/
    
    .state('register', {
        url: '/register',
        templateUrl: '/views/register.html',
        controller: 'RegisterCtrl'
    });
})