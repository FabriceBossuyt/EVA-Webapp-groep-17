'use strict'

angular.module('EVA-Webapp-groep-17')
.controller('LoginCtrl', ['$location', 'AuthenticationService', '$scope',
    function ($location, AuthenticationService, $scope) {

        $scope.logIn = function () {
            $scope.dataloading = true;
            AuthenticationService.login($scope.username, $scope.password, 
                function (response, user) {
                    if (user) {
                        var token = response.token_type + ' ' + response.access_token;
                        AuthenticationService.setCredentials(token);
                        $scope.$emit('user:loggedIn', user);
                        $location.path('/challenges');  
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
    }]);
