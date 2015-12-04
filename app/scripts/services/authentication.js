'use strict'

angular.module('EVA-Webapp-groep-17')
.factory('AuthenticationService', ['$http', '$q', 'localStorageService', '$rootScope', 'UserService', 
    function ($http, $q, localStorageService, $rootScope, UserService) {

        var baseUrl = 'http://localhost:8080'
        var service = {},
        _user = {
            email: '',
            token: '',
            isAuth: false,
            role: '',
            aantalDagen: '',
            refreshToken: ''
        },
        fbAuth, 
        fbResponse;

        service.init = init;
        service.login = login;
        service.setCredentials = setCredentials;
        service.logout = _logout;
        service.getMe = getMe;
        service.watchAuthStatusChange = watchAuthStatusChange;

        return service;

        function init() {
            var authData = localStorageService.get('authData');
            console.log(authData)

            if (authData) {
                _user.token = authData.token;

                getMe().then(
                function (response) {
                    _user.aantalDagen = response.data.data.aantalDagen;
                    _user.isAuth = true;
                    $rootScope.$emit('user:loggedIn', _user);
                }, function () {
                    refreshToken(authData.refreshToken, function (response, user) {
                        var token = response.token_type + ' ' + response.access_token;
                        setCredentials(token, response.refresh_token)
                    });
                    $rootScope.$emit('user:loggedIn', _user);
                });
            } else {
                if (fbAuth) {
                    loginFacebook(fbResponse.accessToken, function (response, user) {
                        var token = response.token_type + ' ' + response.access_token;
                        setCredentials(token, response.refresh_token)
                        $rootScope.$emit('user:loggedIn', _user);
                    })
                } else {
                    $rootScope.$emit('user:loggedOut');
                }
            }
        };

        function watchAuthStatusChange() {
            return FB.getLoginStatus(function (response) {
                switch (response.status) {
                    case 'connected': fbAuth = true;
                        fbResponse = response.authResponse;
                        break;
                    default: fbAuth = false; break;
                }
                init();
            }, true)
        }

        function refreshToken(token, callback) {
            var headers = {};

            headers['Content-Type'] = 'application/x-www-form-urlencoded';

            $http({
                method: 'POST',
                url: 'http://localhost:8080/api/oauth/token',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                data: { refresh_token: token, grant_type: 'refresh_token', client_id: 'mobileV1', client_secret: 'abc123456' },
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

            $rootScope.$emit('user:loggedOut');
        };



        function setCredentials(token, refreshToken) {
            localStorageService.set('authData', {
                token: token,
                refreshToken: refreshToken
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

    }]);