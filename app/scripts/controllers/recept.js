'use strict'

angular.module('EVA-Webapp-groep-17')
.controller('ReceptCtrl', ['$location', '$scope', 'ReceptService', '$window',
    function($location, $scope, ReceptService, $window){
        ReceptService.getAll().then(function (response) {
            $scope.recepten = response.data.data;
        });

    }]);