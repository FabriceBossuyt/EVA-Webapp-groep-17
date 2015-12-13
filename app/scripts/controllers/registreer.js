'use strict'

angular.module('EVA-Webapp-groep-17')
.controller('RegistreerCtrl', ['UserService', '$state',
    function (UserService, $state) {
        var vm = this;

        vm.registreer = function () {
            vm.dataLoading = true;

            UserService.create(vm.user, function(response) {
                if (response === 'Gebruiker added') {
                    vm.dataLoading = false;
                    $state.go('register');
                } else {
                    vm.dataLoading = false;
                    vm.error = response;
                }
            });
        }

    }]);