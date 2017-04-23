'use strict';
//angular.module('nvslonlineAppApp').value("webUrl", "http://pc-sp20131/nvslonlineApi/")
angular.module('nvslonlineAppApp').value("webUrl", "http://localhost:8000/")

angular.module('nvslonlineAppApp').value("debug", true)

angular.module('nvslonlineAppApp').config(function($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider

    .state('home', {
        url: '/home',
        templateUrl: '/views/home.html',
        controller: 'HomeCtrl as vm'
    })
    /*.state('main', {
        url: '/',
        templateUrl: '/views/main.html'
    })*/
    
    /*.state('main', {
        url: '/',
        templateUrl: '/views/home.html',
        controller: 'HomeCtrl as vm'
    })*/

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

    .state('contact', {
        url: '/contact',
        templateUrl: '/views/contact.html',
        controller: 'ContactCtrl as vm'
    })

    /*.state('player', {
        url: '/player/:id',
        param:{
            playerId:null,
        },
        templateUrl: '/views/player.html',
        controller: 'PlayerCtrl as vm',
        resolve:{
            resolveId:function($stateParams){
                return $stateParams.id;
            }
        }*/
        .state('player', {
        url: '/player',
        params:{
            teamId:null,
        },
        templateUrl: '/views/player.html',
        controller: 'PlayerCtrl as vm'
        
    })


    /********************* ADMIN USER ******************/

    .state('dashboard', {
        url: '/dashboard',
        templateUrl: '/views/dashboard.html',
        //controller: 'ADivisionCtrl as vm'
    })

    .state('adminDivision', {
        url: '/ADivisions',
        templateUrl: '/views/a_division.html',
        controller: 'ADivisionCtrl as vm'
    })

    .state('adminSeason', {
        url: '/ASeasons',
        templateUrl: '/views/a_season.html',
        controller: 'ASeasonCtrl as vm'
    })

    .state('adminVenue', {
        url: '/AVenues',
        templateUrl: '/views/a_venue.html',
        controller: 'AVenueCtrl as vm'
    })

    .state('adminTeam', {
        url: '/ATeams',
        templateUrl: '/views/a_team.html',
        controller: 'ATeamCtrl as vm'
    })

    .state('adminSchedule', {
        url: '/ASchedules',
        templateUrl: '/views/a_schedule.html',
        controller: 'AScheduleCtrl as vm'
    })

    .state('adminPlayer', {
        url: '/APlayers',
        templateUrl: '/views/a_player.html',
        controller: 'APlayerCtrl as vm'
    })

    .state('adminContact', {
        url: '/AContact',
        templateUrl: '/views/a_contact.html',
        controller: 'AContactCtrl as vm'
    })

    /***************** CONTRIBUIDOR USER ***************/
    
    
    .state('contribuidorSchedule', {
        url: '/CSchedules',
        templateUrl: '/views/c_schedule.html',
        controller: 'CScheduleCtrl as vm'
    })


    /***************** CONFIGURATION ***************/
    .state('adminNew', {
        url: '/ANews',
        templateUrl: '/views/a_new.html',
        controller: 'ANewCtrl as vm'
    })
   
    /***************** USERS ***************/

    .state('signUp', {
        url: '/signUp',
        templateUrl: '/views/register.html',
        controller: 'RegisterCtrl'
    });

})