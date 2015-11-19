'use strict'

angular.module('EVA-Webapp-groep-17')
.controller('ChallengeCtrl', ['ChallengeService', '$location', '$scope',
    function (ChallengeService, $location, $scope) {

        ChallengeService.getAll().then(
        function (response) {
            $scope.challenges = response.data.data;
        })

    }]);