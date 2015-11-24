'use strict'

angular.module('EVA-Webapp-groep-17')
.controller('LoginCtrl', ['$location', 'AuthenticationService', '$scope', '$rootScope',
    function ($location, AuthenticationService, $scope, $rootScope) {

        $scope.logIn = function () {
            $scope.dataloading = true;
            AuthenticationService.login($scope.username, $scope.password,
                function (response, user) {
                    if (user) {
                        var token = response.token_type + ' ' + response.access_token;
                        AuthenticationService.setCredentials(token);
                        $scope.$emit('user:loggedIn', user);
                        $location.path('/home');
                        $scope.dataloading = false;
                    }
                    else {
                        console.log(response)
                        $scope.error = "Wachtwoord of Gebruikersnaam fout"
                        $scope.dataloading = false;
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
        
        window.fbAsyncInit = function () {
            FB.init({
                appId: '1519833821647286',
                status: true,
                cookie: true,
                xfbml: true,
                channel: '../channel.html',
                version: 'v2.4'
            });
        }

        $rootScope.loginRoute = true;
    }]);
