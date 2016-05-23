'use strict';

angular.module('gestigris-common').directive('etablissementMap',
  function ($timeout, leafletData) {
    return {
      restrict: 'E',
      scope: true,
      replace: true,
      templateUrl: 'modules/etablissements/views/etablissement.map.html',
      link: function (scope, element, attrs) {

        var unwatch = scope.$watch(attrs.etablissement, function (etablissement) {
          if (!_.isUndefined(etablissement)) {
            angular.extend(scope, {
              center: {
                lat: etablissement.coordinates.lat,
                lng: etablissement.coordinates.long,
                zoom: 15
              }
            });
            leafletData.getMap().then(function (map) {
              $timeout(function () {
                scope.markers = {
                  etablissement: {
                    lat: etablissement.coordinates.lat,
                    lng: etablissement.coordinates.long,
                    message: etablissement.address.street,
                    focus: true,
                    draggable: false
                  }
                };
                map.invalidateSize();
              });
            });
            unwatch();
          }
        });
      }
    };
  });
