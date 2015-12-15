'use strict'

angular.module('EVA-Webapp-groep-17')
.controller('RegistreerCtrl', ['UserService', '$state',
    function (UserService, $state) {
        var vm = this;

        vm.registreer = function () {
            vm.dataLoading = true;

            UserService.create(vm.user).then(
               function (response) {
                   console.log('user created')
                   vm.dataLoading = false;
                   $state.go('register', { 'user': vm.user });
               }, function (response) {
                   vm.dataLoading = false;
                   vm.error = response.data;
               });
        }
    }]);