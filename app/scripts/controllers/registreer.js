'use strict'

angular.module('EVA-Webapp-groep-17')
.controller('RegistreerCtrl', ['UserService', '$location', '$rootScope',
    function(UserService, $location, $rootScope){
        var vm = this;
 
        vm.register = register;
 
        function register() {
            vm.dataLoading = true;
            UserService.Create(vm.user, function(response){
                if (response.message === undefined) {
                        $location.path('/login');
                    } else {
                    }
            })
        }
    }]);