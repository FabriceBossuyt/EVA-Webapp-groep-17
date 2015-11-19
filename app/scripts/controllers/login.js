'use strict'

angular.module('EVA-Webapp-groep-17')
.controller('LoginCtrl', ['$location', 'AuthenticationService', '$scope', 'close', '$route',
    function ($location, AuthenticationService, $scope, close, $route) {

        $scope.logIn = function () {
            AuthenticationService.login($scope.username, $scope.password, function (response, user) {
                if (response.error_description === undefined) {
                    var token = response.token_type + ' ' + response.access_token;
                    AuthenticationService.setCredentials(token);
                    $scope.$emit('user:loggedIn', user);
                    $location.path('/home');
                    close();
                }
                else {
                }
            });
        };

        $scope.loginFacebook = function () {
            AuthenticationService.loginFacebook(res.authResponse.accessToken, function (response, user) {
                var token = response.token_type + ' ' + response.access_token;
                AuthenticationService.setCredentials(token);
                $scope.$emit('user:loggedIn', user);
                $location.path('/home');
            });
        }
    }]);
