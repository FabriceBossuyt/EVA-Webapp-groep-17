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
    'ui.bootstrap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/login',{
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/registreer', {
        templateUrl: 'views/registreer.html',
        controller: 'RegistreerCtrl', 
        controllerAs: 'vm'
      })
      .when('/404',{
        templateUrl: '404.html'
      })
      .otherwise({
        redirectTo: '/login' //kies je zelf, gebruik homepage of 404
      });
  })
