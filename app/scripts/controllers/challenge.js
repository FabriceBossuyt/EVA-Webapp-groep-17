'use strict'

angular.module('EVA-Webapp-groep-17')
.controller('ChallengeCtrl', ['ChallengeService', '$scope', 'UserService','$state','$rootScope',
    function (ChallengeService, $scope, UserService, $state, $rootScope) {

        $scope.setActive = function (challenge) {
            var user = {}
            $rootScope.user.huidigeChallenge = challenge._id
            user.huidigeChallenge = challenge._id;
            UserService.putMe(user).then(function (response) {
                $state.go('home');
    	    })
        }

        $scope.challengeDone = function (challenge) {
            for (var i = 0; i < $rootScope.user.aantalChallenges; i++) {
                if ($rootScope.user.gedaneChallenges[i] === challenge._id) {
                    return true;
                }
            }
            return false;
        }

        

        ChallengeService.getAll().then(
        function (response) {
            $scope.challenges = response.data.data;
        })

    }]);