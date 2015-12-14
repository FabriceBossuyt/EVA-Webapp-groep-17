'use strict'

angular.module('EVA-Webapp-groep-17')
.controller('ChallengeCtrl', ['ChallengeService', '$scope',
    function (ChallengeService, $scope) {
    	$scope.setActive = function(challenge){
    		//challenge active zetten, FABRICE
    	}

        ChallengeService.getAll().then(
        function (response) {
            $scope.challenges = response.data.data;
        })

    }]);