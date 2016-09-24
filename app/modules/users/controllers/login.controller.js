'use strict';

angular.module('gestigris-common').controller('LoginController',
  function ($scope, $state, APP) {

    $scope.appName = APP.name;
    $scope.appVersion = APP.version;

    this.handleLogin = function (loginForm, credentials) {
      $scope.signin(loginForm, credentials);
    };
  });
