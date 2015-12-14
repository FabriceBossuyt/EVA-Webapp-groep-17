'use strict'

angular.module('EVA-Webapp-groep-17')
.factory('ChallengeService', ['$http',
    function ($http) {

        var service = {};

        service.getAll = getAll;
        service.getById = getById;
        service.create = create;
        service.update = update;
        service.delete = remove;

        return service;

        function getAll() {
            return $http.get('http://localhost:8080/api/Challenge');
        }

        function getById(id) {
            return $http.get('http://localhost:8080/api/Challenge/' + id);
        }

        function create(challenge, callback) {
            $http.post('http://localhost:8080/api/Challenge', challenge)
            .success(function (response) {
                callback(response);
            }).error(function (response) {
                callback(response);
            });
        }

        function update(challenge) {
            return $http.put('http://localhost:8080/api/Challenge/' + challenge.id, user).then(handleSuccess, handleError('Error updating user'));
        }

        function remove(id) {
            return $http.delete('http://localhost:8080/api/Challenge/' + id).then(handleSuccess, handleError('Error deleting user'));
        }

        // private functions

        function handleSuccess(data) {
            console.log(data);
            return data;
        }

        function handleError(error) {
            return function () {
                console.log(error)
                return { success: false, message: error };
            };
        }

    }]);