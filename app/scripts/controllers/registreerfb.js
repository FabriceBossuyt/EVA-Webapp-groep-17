'use strict'

angular.module('EVA-Webapp-groep-17')
.controller('RegistreerFBCtrl', ['UserService', '$state', '$stateParams', '$scope','AuthenticationService',
    function (UserService, $state, $stateParams, $scope, AuthenticationService) {
        var vm = this;

        vm.registreer = function () {
            vm.dataLoading = true;
            if ($stateParams.user.facebookId) {
                console.log(vm.user)
                UserService.create(vm.user, function (response) {
                    if (response === 'Gebruiker added') {
                        vm.dataLoading = false;
                        AuthenticationService.watchAuthStatusChange();
                        $state.go('home');
                    } else {
                        vm.dataLoading = false;
                        vm.error = response;
                    }
                })
            } else {
                UserService.getByUsername($stateParams.user.email).then(function (response) {
                    vm.user.id = response.data.data._id
                    UserService.update(vm.user).then(function (response) {
                        vm.dataLoading = false;
                        $state.go('login');
                    })
                })
            }
        }

        $scope.$on('$viewContentLoaded', function () {
            vm.user = $stateParams.user;
        });

    }]);