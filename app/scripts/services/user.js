'use strict'

angular.module('EVA-Webapp-groep-17')
.factory('UserService', ['$http', 'localStorageService',
    function($http, localStorageService){

        var service = {};
 
        service.GetAll = GetAll;
        service.GetById = GetById;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;
 
        return service;
 
        function GetAll() {
            return $http.get('/api/gebruikers').then(handleSuccess, handleError('Error getting all users'));
        }
 
        function GetById(id) {
            return $http.get('/api/gebruikers/' + id).then(handleSuccess, handleError('Error getting user by id'));
        }
 
        function Create(user, callback) {
            $http.post('http://localhost:8080/api/gebruikers', user)
            .success(function(response){
                console.log(response)
                callback(response);
            }).error(function(response){
                callback(response);
            });
        }

        function createFacebook(user, callback){

        }

        function Update(user) {
            return $http.put('/api/gebruikers/' + user.id, user).then(handleSuccess, handleError('Error updating user'));
        }
 
        function Delete(id) {
            return $http.delete('/api/gebruikers/' + id).then(handleSuccess, handleError('Error deleting user'));
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