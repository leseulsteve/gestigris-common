'use strict';

angular.module('gestigris-common').run(
  function ($rootScope, $mdMedia) {

    $rootScope.$mdMedia = $mdMedia;
    $rootScope._ = window._;

    $rootScope.$on('$stateChangeSuccess', function () {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    });

    $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
      console.error('$stateChangeError: ', toState, error);
      $rootScope.loadingRoute = false;
    });

    $rootScope.$on('$stateChangeStart', function () {
      $rootScope.loadingRoute = true;
    });

    $rootScope.$on('$stateChangeSuccess', function () {
      $rootScope.loadingRoute = false;
    });

  });
