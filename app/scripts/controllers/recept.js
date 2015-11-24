'use strict'

angular.module('EVA-Webapp-groep-17')
.controller('ReceptCtrl', ['$location', '$scope', 'ReceptService', '$window', '$rootScope', 
    function($location, $scope, ReceptService, $window, $rootScope){
        ReceptService.getAll().then(function (response) {
            $scope.recepten = response.data.data;
        });

        $rootScope.loginRoute = false;

    }]);