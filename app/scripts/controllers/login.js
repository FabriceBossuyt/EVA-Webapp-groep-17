'use strict'

angular.module('EVA-Webapp-groep-17')
.controller('LoginCtrl', ['$location', 'AuthenticationService', '$scope',
    function($location, AuthenticationService, $scope){ 

        $scope.logIn = function () {
            //console.log($scope.username $scope.password)
            AuthenticationService.Login($scope.username, $scope.password, function (response, user) {              
                if (response.error_description === undefined) {
                    var token = response.token_type + ' ' + response.access_token;
                    AuthenticationService.SetCredentials(token);
                    window.history.back();
                    $scope.$emit('user:loggedIn', user);
                } else {                  
                }
            });
        };
    }]);
