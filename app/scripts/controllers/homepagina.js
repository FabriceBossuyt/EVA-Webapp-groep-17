'use strict'

angular.module('EVA-Webapp-groep-17')
.controller('HomeCtrl', ['$location', '$scope', 'ReceptService', '$window', 'AuthenticationService', 'ChallengeService',
    function($location, $scope, ReceptService, $window, AuthenticationService, ChallengeService){
        $scope.gebruiker = {
            email: '',
            token: '',
            isAuth: false, 
            role: '', 
            aantalDagen: ''
        };

        ReceptService.GetAll().then(function(response){
            var recepten = response.data.data;
            $scope.recept = recepten[2]
        });

        ChallengeService.GetAll().then(function(response){
            var challenges = response.data.data;
            $scope.challenge = challenges[1]
        });

        $scope.receptUrl = function(){
            $window.open('http://' + $scope.recept.receptUrl, '_blank');
        } 

        AuthenticationService.GetMe().then(
            function(response){
                 $scope.gebruiker.aantalDagen = response.data.data.aantalDagen;
            }, function(){

            });

    }]);
