'use strict'

angular.module('EVA-Webapp-groep-17')
.controller('ChallengeCtrl', ['ChallengeService', '$location', '$scope',
    function(ChallengeService, $location, $scope){

        ChallengeService.GetAll().then( 
        function(response){
            $scope.challenges = response.data.data;
        })
        
    }]);