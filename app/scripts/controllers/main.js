'use strict';

/**
 * @ngdoc function
 * @name angularZomer2015App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularZomer2015App
 */
angular.module('EVA-Webapp-groep-17')
  .controller('MainCtrl', ['AuthenticationService', '$scope', '$window', 'ModalService', '$route', "$location",
   function (AuthenticationService, $scope, $window, ModalService, $route, $location) {

       var _onUserLoggedIn = function (event, user) {
           $scope.user = user;
       };

       var _onUserLoggedOut = function () {
           $scope.user = {};
           _showModal();
       };

       var _logout = function () {
           AuthenticationService.logout();
           $scope.$broadcast('user:loggedOut');
       };

       AuthenticationService.init().then(function (user) {
           if (user.isAuth) {
               $scope.$broadcast('user:loggedIn', user);
           }
       }, function () {
           $location.path('/login');
       });

       $scope.$on('user:loggedIn', _onUserLoggedIn);
       $scope.$on('user:loggedOut', _onUserLoggedOut);
       $scope.logout = _logout;

   }]);