'use strict'

angular.module('EVA-Webapp-groep-17')
.factory('AuthenticationService', ['$http', '$cookieStore', '$q','$rootScope', '$timeout', 'localStorageService',
    function($http, $cookieStore, $q, $rootScope,  $timeout, localStorageService){

        var baseUrl = 'http://localhost:8080'
        var service = {}, 
        _user = {
            email: '',
            token: '',
            isAuth: false, 
            role: '', 
        };

        service.Init             = Init;
        service.Login            = Login;
        service.SetCredentials   = SetCredentials;
        service.logout           = _logout; 
        service.GetMe            = GetMe;
        service.watchLoginChange = watchLoginChange;
 
        return service;

        function Init() {
            //var authData;
            var authData = localStorageService.get('authData'),
                defer = $q.defer();

            if(authData) {
                _user.token = authData.token;
                GetMe().then(function(){

                }, function(){

                });
               
                    _user.isAuth = true;
                    defer.resolve(_user);
            } else {
                defer.reject();
            }

            return defer.promise;
        };  

        function watchLoginChange(){

            FB.Event.subscribe('auth.authResponseChange', function(res){
                if (res.status === 'connected') {
                getUserInfo();
                } 
                else {
                }
            });
        }

        function getUserInfo() {

  var _self = this;

  FB.api('/me', function(res) {

    $rootScope.$apply(function() { 
        console.log(res)
      //$rootScope.user = _self.user = res; 

    });

  });

}

logout = function() {

  var _self = this;

  FB.logout(function(response) {

    $rootScope.$apply(function() { 

      //$rootScope.user = _self.user = {}; 

    }); 

  });

}

            
           
 
        function Login(username, password, callback) {
              var headers={};

            headers['Content-Type'] = 'application/x-www-form-urlencoded';

            $http({
                method: 'POST',
                url: 'http://localhost:8080/oauth/token',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: { username: username, password: password, grant_type: 'password',client_id: 'mobileV1', client_secret: 'abc123456'}, 
                transformRequest: function (obj) {
                                    var str = [];
                                    for (var p in obj)
                                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                                    return str.join("&");
            }}).success(function(response) {
                callback(response, _user);
            }).error(function(response){
                callback(response);
            });
        }

        function LoginFacebook(accesstoken){
            var headers={};

            headers['Content-Type'] = 'application/x-www-form-urlencoded';

            $http({
                method: 'POST',
                url: 'http://localhost:8080/oauth/token',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: { token: accesstoken, grant_type: 'facebook', client_id: 'mobileV1', client_secret: 'abc123456'}, 
                transformRequest: function (obj) {
                                    var str = [];
                                    for (var p in obj)
                                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                                    return str.join("&");
            }}).success(function(response) {
                callback(response, _user);
            }).error(function(response){
                callback(response);
            });
        }

        function _logout() {
            localStorageService.remove('authData');

            _user.token = '';
            _user.isAuth = false;
        };

        
 
        function SetCredentials(token) {           
            localStorageService.set('authData', {
                    token: token
            });

            _user.token = token;
            GetMe().then(function(response){
                _user.isAuth = true;
                _user.email = response.name

            }, function(err){
                console.log(err);
            });
        }

        function GetMe(){
            var header = {};
            header.Authorization = _user.token;
            header['Content-Type'] = 'application/x-www-form-urlencoded';

            return $http({
                method: 'GET',
                url: 'http://localhost:8080/api/userInfo', 
                headers: header
            });
        }
}]);