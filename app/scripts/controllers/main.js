'use strict';

/**
 * @ngdoc function
 * @name angularZomer2015App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularZomer2015App
 */
angular.module('EVA-Webapp-groep-17')
  .controller('MainCtrl', ['AuthenticationService', '$scope', 
   function (AuthenticationService, $scope) {

  	var _onUserLoggedIn = function(event, user) {
                $scope.user = user;
            };

    var _onUserLoggedOut = function() {
                $scope.user = {};
            };

    var _logout = function() {
         AuthenticationService.logout();    
         $scope.$broadcast('user:loggedOut');
            };


	AuthenticationService.Init().then(function(user) {
                if (user.isAuth) {
                  console.log(user)
                    $scope.$broadcast('user:loggedIn', user);
                }
            });


   $scope.$on('user:loggedIn', _onUserLoggedIn);
   $scope.$on('user:loggedOut', _onUserLoggedOut);
   $scope.logout = _logout;

}]);