'use strict';

angular.module('gestigris-common').controller('LoginController',
  function ($scope, $state, GESTIGRIS) {

    $scope.appName = GESTIGRIS.APPNAME;

    this.handleLogin = function (loginForm, credentials) {
      $scope.signin(loginForm, credentials);
    };

    this.handleLogedIn = function () {
      $state.go('interventions');
    };
  });
