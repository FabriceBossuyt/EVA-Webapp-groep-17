'use strict'

angular.module('EVA-Webapp-groep-17')
.controller('HomeCtrl', ['$scope', 'ReceptService', '$window', 'AuthenticationService', 'ChallengeService', 
    function ($scope, ReceptService, $window, AuthenticationService, ChallengeService) {
       

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

    }]);
