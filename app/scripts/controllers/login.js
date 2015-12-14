'use strict'

angular.module('EVA-Webapp-groep-17')
.controller('LoginCtrl', ['AuthenticationService', '$scope', '$state', '$rootScope', 'UserService',
    function (AuthenticationService, $scope, $state, $rootScope, UserService) {
        var gebruiker;

        $scope.logIn = function () {
            $scope.dataloading = true;
            AuthenticationService.login($scope.username, $scope.password,
                function (response, user) {
                    if (user) {
                        var token = response.token_type + ' ' + response.access_token;
                        AuthenticationService.setCredentials(token);
                        $rootScope.$emit('user:loggedIn', user);
                        $scope.dataloading = false;
                    }
                    else {
                        $scope.error = "Wachtwoord of Gebruikersnaam fout"
                        $scope.dataloading = false;
                    }
                });
        };

        window.fbLogin = function () {
            FB.api('/me', { fields: 'last_name, first_name, email' }, function (response) {
                UserService.getGebruikerByfacebookId(response.id).then(function () {
                    AuthenticationService.watchAuthStatusChange();
                    $state.go('home');
                }, function () {
                    $state.go('register', { 'user': { 'email': response.email, 'voornaam': response.first_name, 'naam': response.last_name, 'facebookId': response.id, 'password': ' ' } });
                });
            });


        }

        $scope.$on('$viewContentLoaded', function () {
            if (FB) {
                FB.XFBML.parse();
            }
        });
    }]);
