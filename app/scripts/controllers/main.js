'use strict';

/**
 * @ngdoc function
 * @name angularZomer2015App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularZomer2015App
 */
angular.module('EVA-Webapp-groep-17')
  .controller('MainCtrl', ['AuthenticationService', '$scope', '$state', '$rootScope',
   function (AuthenticationService, $scope, $state, $rootScope) {

       var _onUserLoggedIn = function (event, user) {
           $rootScope.user = user;
           $state.go('home');
       };

       var _onUserLoggedOut = function () {
           $rootScope.user = {};
           $state.go('register');
       };

       var _logout = function () {
           AuthenticationService.logout();
           $rootScope.$broadcast('user:loggedOut');
       };

       $rootScope.$on('user:loggedIn', _onUserLoggedIn);
       $rootScope.$on('user:loggedOut', _onUserLoggedOut);
       $scope.logout = _logout;

   }]);