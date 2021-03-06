'use strict';

angular.module('gestigris-common').config(
  function ($urlRouterProvider, $httpProvider, API_URL) {

    $urlRouterProvider.otherwise('/');

    $httpProvider.interceptors.push(function () {
      return {
        'request': function (config) {
          if (!_.endsWith(config.url, '.html') && !_.endsWith(config.url, '.json') &&  !_.startsWith(config.url, 'http')) {
            var urlPrefix = API_URL;

            if (!_.startsWith(config.url, 'photon')) {

              var route = config.url.split('/')[config.url.split('/').length - 2];

              if (!_.includes(['img', 'icons', '/'], route) && !_.endsWith(config.url, 'md-close.svg') && !_.endsWith(config.url, 'md-tabs-arrow.svg') && !_.endsWith(config.url, 'md-calendar.svg')) {
                urlPrefix += '/api/v1';
                config.url = urlPrefix + '/' + config.url;
              }

            }

          }
          return config;
        }
      };
    });
  });
