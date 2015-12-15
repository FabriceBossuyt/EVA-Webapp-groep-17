'use strict'

angular.module('EVA-Webapp-groep-17')
.controller('HomeCtrl', ['$scope', 'ReceptService', '$window', 'AuthenticationService', 'ChallengeService', '$rootScope', 'UserService', '$state', 
    function ($scope, ReceptService, $window, AuthenticationService, ChallengeService, $rootScope, UserService, $state) {
        $rootScope.active = false;

        ReceptService.getAll().then(function (response) {
            var recepten = response.data.data;
            $scope.recept = recepten[2]
        });

        $rootScope.$watch('user', function () {
            console.log('bla')
            if ($rootScope.user.huidigeChallenge) {
                ChallengeService.getById($rootScope.user.huidigeChallenge).then(function (response) {
                    $scope.challenge = response.data.data;
                    $rootScope.active = true;
                })
            }
        });

        $scope.voltooiChallenge = function (challenge) {
            var user = {};
            $rootScope.user.huidigeChallenge = '';
            $rootScope.user.gedaneChallenges.push(challenge._id)
            user.newChallenge = challenge._id
            user.huidigeChallenge = '';

            UserService.putMe(user).then(function (response) {
                console.log(response)
                $rootScope.user.aantalChallenges = response.data.gebruiker.gedaneChallenges.length;
                $state.reload();
            })
        }

        $scope.receptUrl = function () {
            $window.open('http://' + $scope.recept.receptUrl, '_blank');
        }

    }]);
