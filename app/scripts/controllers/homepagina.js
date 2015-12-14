'use strict'

angular.module('EVA-Webapp-groep-17')
.controller('HomeCtrl', ['$scope', 'ReceptService', '$window', 'AuthenticationService', 'ChallengeService', '$rootScope',
    function ($scope, ReceptService, $window, AuthenticationService, ChallengeService, $rootScope) {

        ReceptService.getAll().then(function (response) {
            var recepten = response.data.data;
            $scope.recept = recepten[2]
        });

        $scope.loadChallenge = function(challenge){
            console.log(challenge)
        }

        $rootScope.$watch('user', function () {
            if ($rootScope.user) {
                ChallengeService.getById($rootScope.user.huidigeChallenge).then(function (response) {
                    console.log($rootScope.user)
                    $scope.challenge = response.data.data;
                })
            }
        });

        $scope.receptUrl = function () {
            $window.open('http://' + $scope.recept.receptUrl, '_blank');
        }

    }]);
