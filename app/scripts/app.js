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
    'ngSanitize',
    'ngTouch',
    'ngMaterial',
    'ngMaterial',
    'LocalStorageModule',
    'ui.bootstrap',
    'ui.router'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {

      $urlRouterProvider.otherwise('/home');

      $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'views/homepagina.html',
            controller: 'HomeCtrl'
        })
        .state('login', {
            url: '/login',
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl'
        })
        .state('registreer', {
            url: '/registreer',
            templateUrl: 'views/registreer.html',
            controller: 'RegistreerCtrl',
            controllerAs: 'vm'
        })
        .state('challenges', {
            ur: '/challenges',
            templateUrl: 'views/challenges.html',
            controller: 'ChallengeCtrl'
        })
        .state('recepten', {
            url: '/recepten',
            templateUrl: 'views/recepten.html',
            controller: 'ReceptCtrl'
        })
        .state('register', {
            url: '/register',
            params: { 'user': null },
            templateUrl: 'views/registreerfb.html',
            controller: 'RegistreerFBCtrl',
            controllerAs: 'vm'
        })
          .state('vrienden', {
              url: '/vrienden',
              templateUrl: 'views/vrienden.html',
              controller: 'VriendenCtrl'
          })
          .state('profiel', {
              url: '/profiel', 
              templateUrl: 'views/profiel.html',
              controller: 'ProfielCtrl'
          })
        .state('404', {
            url: '/404',
            templateUrl: '404.html'
        })
  })

.run(function ($rootScope, AuthenticationService) {
    window.fbAsyncInit = function () {
        FB.init({
            appId: '1519833821647286',
            status: true,
            cookie: true,
            xfbml: true,
            channel: '../channel.html',
            version: 'v2.4'
        });
        AuthenticationService.watchAuthStatusChange();
    };

    (function (d) {
        var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
        if (d.getElementById(id)) {
            return;
        }
        js = d.createElement('script');
        js.id = id;
        js.async = true;
        js.src = "//connect.facebook.net/nl_BE/sdk.js";
        ref.parentNode.insertBefore(js, ref);
    }(document));
})
