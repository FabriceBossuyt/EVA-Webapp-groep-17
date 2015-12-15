'use strict'

angular.module('EVA-Webapp-groep-17')
.controller('VriendenCtrl', ['$scope', '$state', 'UserService',
    function ($scope, $state, UserService) {
        var users = [];
        FB.api('/me/friends', { fields: 'name, picture' }, function (response) {
            $scope.$apply(function () {
                $scope.vrienden = response.data;
                $scope.vrienden.forEach(function(vriend) {
                    UserService.getGebruikerByfacebookId(vriend.id).then(
                        function (gebruiker) {
                          vriend.aantalChallenges = gebruiker.data.data.gedaneChallenges.length;s
                        }
                    );
                });
            })
        })

        $scope.$watch('vrienden', function () {
            if ($scope.vrienden) {

                
            }
        })
    }]);