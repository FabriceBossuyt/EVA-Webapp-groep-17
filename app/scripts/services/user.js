'use strict'

angular.module('EVA-Webapp-groep-17')
.factory('UserService', ['$http', 'localStorageService',
    function ($http, localStorageService) {

        var service = {},
            baseUrl = 'http://localhost:8080/api/';

        service.getAll = getAll;
        service.getById = getById;
        service.create = create;
        service.update = update;
        service.delete = remove;
        service.getGebruikerByfacebookId = getUserByFacebookId;
        service.getByUsername = getByUsername;
        service.putMe = putMe;

        return service;

        function getAll() {
            return $http.get('/api/gebruikers').then(handleSuccess, handleError('Error getting all users'));
        }

        function getById(id) {
            return $http.get('/api/gebruikers/' + id).then(handleSuccess, handleError('Error getting user by id'));
        }

        function create(user, callback) {
            $http.post(baseUrl + 'gebruikers', user)
            .success(function (response) {
                callback(response);
            }).error(function (response) {
                callback(response);
            });
        }

        function getByUsername(username) {
            return $http.get(baseUrl + 'gebruikerByUsername/' + username)
        }

        function getUserByFacebookId(fbId) {
            return $http.get(baseUrl + 'gebruikerByFacebookId/' + fbId);
        };

        function update(user) {
            return $http.put(baseUrl + 'gebruikers/' + user.id, user).then(handleSuccess, handleError('Error updating user'));
        }

        function putMe(user) {
            console.log(user)
            var header = {};
            header.Authorization = localStorageService.get('authData').token;
            header['Content-Type'] = 'application/x-www-form-urlencoded';

            return $http({
                method: 'PUT',
                url: baseUrl + 'me/',
                headers: header,
                data: user,
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                }
            });
        }

        function remove(id) {
            return $http.delete(baseUrl +  'gebruikers/' + id).then(handleSuccess, handleError('Error deleting user'));
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