'use strict'

angular.module('EVA-Webapp-groep-17')
.controller('ChallengeCtrl', ['ChallengeService', '$location', '$scope', '$rootScope',
    function (ChallengeService, $location, $scope, $rootScope) {

        ChallengeService.getAll().then(
        function (response) {
            $scope.challenges = response.data.data;
        })

        $rootScope.loginRoute = false;

    }]);