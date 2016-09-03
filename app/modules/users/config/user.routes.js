'use strict';

angular.module('users')
  .config(function ($stateProvider) {

    $stateProvider.

    state('login', {
      url: '/connexion',
      templateUrl: 'modules/users/views/login.form.html',
      controller: 'LoginController',
      controllerAs: 'loginCtrl'
    });
  });
