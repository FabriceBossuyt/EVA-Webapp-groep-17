'use strict'

angular.module('EVA-Webapp-groep-17')
.factory('AuthenticationService', ['$http', '$q','localStorageService',
    function ($http, $q, localStorageService) {

        var baseUrl = 'http://localhost:8080'
        var service = {},
        _user = {
            email: '',
            token: '',
            isAuth: false,
            role: '',
            aantalDagen: '',
            refreshToken: ''
        };

        service.init = init;
        service.login = login;
        service.setCredentials = setCredentials;
        service.logout = _logout;
        service.getMe = getMe;
        service.watchAuthStatusChange = watchAuthStatusChange;

        return service;

        function init() {

            var authData = localStorageService.get('authData'),
                defer = $q.defer();
            if (authData) {
                _user.token = authData.token;
                
                getMe().then(
                function (response) {
                    _user.aantalDagen = response.data.data.aantalDagen;
                    _user.isAuth = true;
                    defer.resolve(_user)
                }, function () {
                    defer.reject();
                });
            } else {
                defer.reject();
            }

            return defer.promise;
        };

        function login(username, password, callback) {
            var headers = {};

            headers['Content-Type'] = 'application/x-www-form-urlencoded';

            $http({
                method: 'POST',
                url: 'http://localhost:8080/api/oauth/token',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                data: { username: username, password: password, grant_type: 'password', client_id: 'mobileV1', client_secret: 'abc123456' },
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                }
            }).success(function (response) {
                callback(response, _user);
            }).error(function (response) {
                callback(response);
            });
        }

        function loginFacebook(accesstoken, callback) {
            var headers = {};

            headers['Content-Type'] = 'application/x-www-form-urlencoded';

            $http({
                method: 'POST',
                url: 'http://localhost:8080/api/oauth/token',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                data: { token: accesstoken, grant_type: 'facebook', client_id: 'mobileV1', client_secret: 'abc123456' },
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                }
            }).success(function (response) {
                callback(response, _user);
            }).error(function (response) {
                callback(response);
            });
        }

        function _logout() {
            localStorageService.remove('authData');

            _user.token = '';
            _user.isAuth = false;
        };



        function setCredentials(token) {
            localStorageService.set('authData', {
                token: token
            });

            _user.token = token;
            getMe().then(function (response) {
                _user.isAuth = true;
                _user.email = response.data.data.username
                _user.aantalDagen = response.data.data.aantalDagen

            }, function (err) {
                console.log(err);
            });
        }

        function getMe() {
            var header = {};
            header.Authorization = _user.token;
            header['Content-Type'] = 'application/x-www-form-urlencoded';

            return $http({
                method: 'GET',
                url: 'http://localhost:8080/api/userInfo',
                headers: header
            });
        }

        function watchAuthStatusChange() {
            FB.Event.subscribe('auth.authResponseChange', function (res) {
                switch (res.status) {
                    case 'connected':
                        return true;
                        break;
                    default: return false; break;
                }
            })
        }

        
    }]);