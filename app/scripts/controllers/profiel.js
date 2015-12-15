'use strict'

angular.module('EVA-Webapp-groep-17')
.controller('ProfielCtrl', ['AuthenticationService', '$scope', '$rootScope', '$state',
    function (AuthenticationService, $scope, $rootScope, $state) {

        AuthenticationService.getMe().then(function (response) {
            $scope.userProfiel = response.data.data;
        })
        $scope.checked = false;

        $scope.reload = function () {
            $state.reload();
        }

        if ($rootScope.user.facebookId) {
            console.log('facebook')
            FB.api('/me', { fields: 'picture' }, function (response) {
                $scope.$apply(function () {
                    $scope.picture = response.picture.data.url
                })
            })
        }
        else {
            $scope.picture = '../../images/profiel-foto.jpg';
        }


    }]);