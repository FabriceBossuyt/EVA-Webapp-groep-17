'use strict';

/**
 * @ngdoc overview
 * @name angularZomer2015App
 * @description
 * # angularZomer2015App
 *
 * Main module of the application.
 */
angular
  .module('EVA-Webapp-groep-17', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngMaterial',
    'ngMaterial',
    'LocalStorageModule',
    'ui.bootstrap',
    'angularModalService'
  ])
  .config(function ($routeProvider) {
      $routeProvider
        .when('/', {
            templateUrl: 'views/homepagina.html',
            controller: 'HomeCtrl'
        })
        .when('/home', {
            templateUrl: 'views/homepagina.html',
            controller: 'HomeCtrl'
        })
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl'
        })
        .when('/registreer', {
            templateUrl: 'views/registreer.html',
            controller: 'RegistreerCtrl',
            controllerAs: 'vm'
        })
        .when('/challenges', {
            templateUrl: 'views/challenges.html',
            controller: 'ChallengeCtrl'
        })
        .when('/recepten', {
            templateUrl: 'views/recepten.html',
            controller: 'ReceptCtrl'
        })
          .when('/register', {
              templateurl: 'views/registreerfb.html',
              controller: 'RegistreerCtrl'
          })
        .when('/404', {
            templateUrl: '404.html'
        })
        .otherwise({
            redirectTo: '/home' //kies je zelf, gebruik homepage of 404
        });
  })

.run(function($rootScope){
        window.fbAsyncInit = function () {
        FB.init({
            appId:'1519833821647286',
            status:true,
            cookie:true,
            xfbml:true
        });
        
        FB.Event.subscribe('auth.statusChange', function(response) {
            $rootScope.$broadcast("fb_statusChange", {'status': response.status});
        });
    };

    (function (d) {
        var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
        if (d.getElementById(id)) {
            return;
        }
        js = d.createElement('script');
        js.id = id;
        js.async = true;
        js.src = "//connect.facebook.net/en_US/all.js";
        ref.parentNode.insertBefore(js, ref);
    }(document));
})
