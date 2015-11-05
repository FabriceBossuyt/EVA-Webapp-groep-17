'use strict'

angular.module('EVA-Webapp-groep-17')
.factory('ReceptService', ['$http',
    function($http){

    	var service = {};
 
        service.GetAll = GetAll;
        service.GetById = GetById;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;

        return service;

    	function GetAll() {
            return $http.get('http://localhost:8080/api/recept')
        }
 
        function GetById(id) {
            return $http.get('http://localhost:8080/api/recept/' + id).then(handleSuccess, handleError('Error getting user by id'));
        }
 
        function Create(recept, callback) {
            $http.post('http://localhost:8080/api/recept', recept)
            .success(function(response){
                callback(response);
            }).error(function(response){
                callback(response);
            });
        }

        function Update(recept) {
            return $http.put('http://localhost:8080/api/recept/' + recept.id, recept).then(handleSuccess, handleError('Error updating user'));
        }
 
        function Delete(id) {
            return $http.delete('http://localhost:8080/api/recept/' + id).then(handleSuccess, handleError('Error deleting user'));
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