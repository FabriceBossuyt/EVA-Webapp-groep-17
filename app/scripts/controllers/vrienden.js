'use strict'

angular.module('EVA-Webapp-groep-17')
.controller('VriendenCtrl', ['$scope', 
    function ($scope) {
        
        FB.api('/me/friends', function(response){
            console.log(response)
        })

    }]);