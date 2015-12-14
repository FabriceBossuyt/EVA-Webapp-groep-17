'use strict'

angular.module('EVA-Webapp-groep-17')
.controller('HomeCtrl', ['$scope', 'ReceptService', '$window', 'AuthenticationService', 'ChallengeService', '$rootScope',
    function ($scope, ReceptService, $window, AuthenticationService, ChallengeService, $rootScope) {
        $rootScope.active = false;

        ReceptService.getAll().then(function (response) {
            var recepten = response.data.data;
            $scope.recept = recepten[2]
        });

        $rootScope.$watch('user', function () {
            if ($rootScope.user.huidigeChallenge) {
                ChallengeService.getById($rootScope.user.huidigeChallenge).then(function (response) {
                    $scope.challenge = response.data.data;
                    $rootScope.active = true;
                })
            }
        });

        $scope.receptUrl = function () {
            $window.open('http://' + $scope.recept.receptUrl, '_blank');
        }

    }]);
