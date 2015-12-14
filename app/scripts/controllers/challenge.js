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

        

        ChallengeService.getAll().then(
        function (response) {
            $scope.challenges = response.data.data;
        })

    }]);