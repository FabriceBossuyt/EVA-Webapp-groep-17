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
            if ($rootScope.user.huidigeChallenge) {
                ChallengeService.getById($rootScope.user.huidigeChallenge).then(function (response) {
                    $rootScope.challenge = response.data.data;
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
        $scope.postFeed = function () {
            FB.ui({
            method: 'feed',
            name: $rootScope.user.voornaam + ' heeft een nieuwe EVA-Challenge gestart: '+ $rootScope.challenge.titel,
            link: 'https://evavzw.be',
            description: $rootScope.challenge.omschrijving,
            caption: 'Project EVA',
            }, function(response){});
        }

        $scope.receptUrl = function () {
            $window.open('http://' + $scope.recept.receptUrl, '_blank');
        }


    }]);
