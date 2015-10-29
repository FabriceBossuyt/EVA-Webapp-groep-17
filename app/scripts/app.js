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
    'lk-google-picker',
    'ngMaterial', 
    'LocalStorageModule', 
    'ui.bootstrap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/login',{
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
      })
      .when('/404',{
        templateUrl: '404.html'
      })
      .otherwise({
        redirectTo: '/404' //kies je zelf, gebruik homepage of 404
      });
  })
