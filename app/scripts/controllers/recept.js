'use strict'

angular.module('EVA-Webapp-groep-17')
.controller('ReceptCtrl', ['$scope', 'ReceptService', '$window',
    function ($scope, ReceptService, $window) {

        ReceptService.getAll().then(function (response) {
            $scope.recepten = response.data.data;
            console.log(response.data.data)
        });

        $scope.receptUrl = function (recept) {
            $window.open('http://' + recept.receptUrl, '_blank');
        }
    }]);