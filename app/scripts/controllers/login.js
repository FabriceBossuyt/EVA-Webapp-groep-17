'use strict'

angular.module('EVA-Webapp-groep-17')
.controller('LoginCtrl', ['AuthenticationService', '$scope', '$state', '$rootScope',
    function ( AuthenticationService, $scope,$state, $rootScope) {

        $scope.logIn = function () {
            $scope.dataloading = true;
            AuthenticationService.login($scope.username, $scope.password,
                function (response, user) {
                    if (user) {
                        var token = response.token_type + ' ' + response.access_token;
                        AuthenticationService.setCredentials(token, response.refresh_token);
                        $rootScope.$emit('user:loggedIn', user);
                        $scope.dataloading = false;
                    }
                    else {
                        $scope.error = "Wachtwoord of Gebruikersnaam fout"
                        $scope.dataloading = false;
                    }
                });
        };
       
        //$scope.fbLogin = function () {
        //    AuthenticationService.fbLogin(res.authResponse.accessToken, function (response, user) {
        //        var token = response.token_type + ' ' + response.access_token;
        //        AuthenticationService.setCredentials(token, response.refresh_token);
        //        $rootScope.$emit('user:loggedIn', user);
        //        $state.go('home');
        //    });
        //}

        $scope.$on('$viewContentLoaded', function () {
            if(FB)
            {
                FB.XFBML.parse();
            }
        });
    }]);
