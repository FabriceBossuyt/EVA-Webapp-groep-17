'use strict'

angular.module('EVA-Webapp-groep-17')
.factory('ChallengeService', ['$http',
    function($http){

    	var service = {};
 
        service.GetAll = GetAll;
        service.GetById = GetById;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;

        return service;

    	function GetAll() {
            return $http.get('http://localhost:8080/api/Challenge');
        }
 
        function GetById(id) {
            return $http.get('http://localhost:8080/api/Challenge/' + id).then(handleSuccess, handleError('Error getting user by id'));
        }
 
        function Create(challenge, callback) {
            $http.post('http://localhost:8080/api/Challenge', challenge)
            .success(function(response){
                callback(response);
            }).error(function(response){
                callback(response);
            });
        }

        function Update(challenge) {
            return $http.put('http://localhost:8080/api/Challenge/' + challenge.id, user).then(handleSuccess, handleError('Error updating user'));
        }
 
        function Delete(id) {
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