'use strict';

/**
 * @ngdoc function
 * @name angularZomer2015App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularZomer2015App
 */
angular.module('EVA-Webapp-groep-17')
  .controller('MainCtrl', ['AuthenticationService', '$scope', '$window', 'ModalService', '$route', "$location", "$rootScope",
   function (AuthenticationService, $scope, $window, ModalService, $route, $location, $rootScope) {

       var _onUserLoggedIn = function (event, user) {
           $scope.user = user;
           $location.path('/home');
       };

       var _onUserLoggedOut = function () {
           $scope.user = {};
           $location.path('/login');
       };

       var _logout = function () {
           console.log('logged out')
           AuthenticationService.logout();
           $scope.$broadcast('user:loggedOut');
       };

       AuthenticationService.init().then(
           function (user) {
               console.log(user)
               if (user.isAuth) {
                   $scope.$broadcast('user:loggedIn', user);
               }
               else {
                   $scope.$broadcast('user:loggedOut');
               }
           }, function () {
               console.log('why here')
               $location.path('/login');
           });

       $rootScope.loginRoute = $location.path() === '/login';

       $scope.$on('user:loggedIn', _onUserLoggedIn);
       $scope.$on('user:loggedOut', _onUserLoggedOut);
       $scope.logout = _logout;

   }]);