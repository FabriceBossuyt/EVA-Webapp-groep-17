'use strict';

/**
 * @ngdoc function
 * @name angularZomer2015App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularZomer2015App
 */
angular.module('EVA-Webapp-groep-17')
  .controller('MainCtrl', ['AuthenticationService', '$scope', '$state',
   function (AuthenticationService, $scope, $state) {

       var _onUserLoggedIn = function (event, user) {
           $scope.user = user;
           $state.go('home');
       };

       var _onUserLoggedOut = function () {
           $scope.user = {};
           $state.go('login');
       };

       var _logout = function () {
           AuthenticationService.logout();
           $scope.$broadcast('user:loggedOut');
       };

       var _onFbStatusChange = function () {
           //FB status check
       }


       AuthenticationService.init().then(
           function (user) {
               if (user.isAuth) {
                   $scope.$broadcast('user:loggedIn', user);
               }
               else {
                   $scope.$broadcast('user:loggedOut');
               }
           }, function () {
               $state.go('login');
           });

       $scope.$on('user:loggedIn', _onUserLoggedIn);
       $scope.$on('user:loggedOut', _onUserLoggedOut);
       $scope.$on('fb_statusChange', _onFbStatusChange);
       $scope.logout = _logout;

   }]);