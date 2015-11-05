'use strict';

/**
 * @ngdoc function
 * @name angularZomer2015App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularZomer2015App
 */
angular.module('EVA-Webapp-groep-17')
  .controller('MainCtrl', ['AuthenticationService', '$scope', '$window',
   function (AuthenticationService, $scope, $window) {

       (function(d){
    // load the Facebook javascript SDK

    var js, 
    id = 'facebook-jssdk', 
    ref = d.getElementsByTagName('script')[0];

    if (d.getElementById(id)) {
      return;
    }

    js = d.createElement('script'); 
    js.id = id; 
    js.async = true;
    js.src = "//connect.facebook.net/nl_BE/all.js";

    ref.parentNode.insertBefore(js, ref);

  }(document));

    $window.fbAsyncInit = function() {
    // Executed when the SDK is loaded

    FB.init({ 
      appId: '1519833821647286',

      /* 
       Set if you want to check the authentication status
       at the start up of the app 
      */

      status: true, 

      /* 
       Enable cookies to allow the server to access 
       the session 
      */

      cookie: true, 

      /* Parse XFBML */

      xfbml: true 
    });
  }

  AuthenticationService.watchLoginChange();

 


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