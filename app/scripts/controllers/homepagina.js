'use strict'

angular.module('EVA-Webapp-groep-17')
.controller('HomeCtrl', ['$location', '$scope', 'ReceptService', '$window', 'AuthenticationService', 'ChallengeService', '$rootScope',
    function ($location, $scope, ReceptService, $window, AuthenticationService, ChallengeService, $rootScope) {
        $scope.gebruiker = {
            email: '',
            token: '',
            isAuth: false,
            role: '',
            aantalDagen: ''
        };

        ReceptService.getAll().then(function (response) {
            var recepten = response.data.data;
            $scope.recept = recepten[2]
        });

        ChallengeService.getAll().then(function (response) {
            var challenges = response.data.data;
            $scope.challenge = challenges[1]
        });

        $scope.receptUrl = function () {
            $window.open('http://' + $scope.recept.receptUrl, '_blank');
        }

        AuthenticationService.getMe().then(
            function (response) {
                $scope.gebruiker.aantalDagen = response.data.data.aantalDagen;
            }, function () {

            });

        $rootScope.loginRoute = false;

    }]);
