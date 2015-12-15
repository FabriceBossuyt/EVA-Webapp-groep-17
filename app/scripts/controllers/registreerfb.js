'use strict'

angular.module('EVA-Webapp-groep-17')
.controller('RegistreerFBCtrl', ['UserService', '$state', '$stateParams', '$scope','AuthenticationService',
    function (UserService, $state, $stateParams, $scope, AuthenticationService) {
        var vm = this;

        vm.registreer = function () {
            vm.dataLoading = true;
            console.log($stateParams.user)
            if ($stateParams.user.facebookId) {
                UserService.create(vm.user).then(function (response) {
                    console.log('created')
                    vm.dataLoading = false;
                    AuthenticationService.watchAuthStatusChange();
                    $state.go('home');
                }, function (response) {
                    vm.dataLoading = false;
                    vm.error = response.data;
                });
            } else {
                console.log('no fb id')
                UserService.getByUsername($stateParams.user.email).then(function (response) {
                    vm.user.id = response.data.data._id
                    UserService.update(vm.user).then(function (response) {
                        console.log('user updated')
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