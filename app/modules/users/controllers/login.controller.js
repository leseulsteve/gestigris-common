'use strict';

angular.module('gestigris-common').controller('LoginController',
  function ($scope, $state) {

    this.handleLogin = function (loginForm, credentials) {
      $scope.signin(loginForm, credentials);
    };

    this.handleLogedIn = function () {
      $state.go('interventions');
    };
  });
