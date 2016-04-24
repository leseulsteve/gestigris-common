'use strict';

angular.module('gestigris-common').config(
  function ($urlRouterProvider, $httpProvider) {

    $urlRouterProvider.otherwise('/');

    $httpProvider.interceptors.push(function () {
      return {
        'request': function (config) {
          if (!_.endsWith(config.url, '.html') && !_.endsWith(config.url, '.json') &&  !_.startsWith(config.url, 'http')) {
            //var urlPrefix = 'http://vps54578.vps.ovh.ca:90',
            var urlPrefix = 'http://localhost:9011',

              route = config.url.split('/')[config.url.split('/').length - 2];

            if (!_.contains(['img', 'icons', '/'], route) && !_.endsWith(config.url, 'md-close.svg') && !_.endsWith(config.url, 'md-tabs-arrow.svg')) {
              urlPrefix += '/api/v1';
              config.url = urlPrefix + '/' + config.url;
            }

          }
          return config;
        }
      };
    });
  });
