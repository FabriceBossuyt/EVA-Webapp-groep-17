'use strict'

angular.module('EVA-Webapp-groep-17')
.controller('RegistreerCtrl', ['UserService', '$location',
    function (UserService, $location) {
        var vm = this;

        vm.registreer = function () {
            vm.dataLoading = true;
            UserService.create(vm.user, function (response) {
                console.log(response)
                if (response.message === 'Gebruiker added') {
                    vm.dataLoading = false;
                    $location.path('/login');
                } else {
                }
            })
        }
    }]);