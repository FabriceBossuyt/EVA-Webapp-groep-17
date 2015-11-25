'use strict'

angular.module('EVA-Webapp-groep-17')
.controller('ReceptCtrl', ['$scope', 'ReceptService', '$window',
    function ($scope, ReceptService, $window) {
        ReceptService.getAll().then(function (response) {
            $scope.recepten = response.data.data;
        });

        $scope.receptUrl = function () {
            $window.open('http://' + $scope.recept.receptUrl, '_blank');
        }
    }]);