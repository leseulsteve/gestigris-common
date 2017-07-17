'use strict';

angular.module('gestigris-common').directive('etablissementMap',
  function () {
    return {
      restrict: 'E',
      scope: true,
      replace: true,
      templateUrl: 'modules/etablissements/views/etablissement.map.html',
      link: function (scope, element, attrs) {

        scope.$watch(attrs.etablissement, function (etablissement) {
          if (etablissement && !_.isUndefined(etablissement.coordinates)) {
            angular.extend(scope, {
              center: {
                lat: etablissement.coordinates.lat,
                lng: etablissement.coordinates.long,
                zoom: 15
              },
              defaults: {
                dragging: 'dragging' in attrs ? scope.$eval(attrs.dragging) : true,
                scrollWheelZoom: 'scrollWheelZoom' in attrs ? scope.$eval(attrs.scrollWheelZoom) : true
              },
              markers: {
                etablissement: {
                  lat: etablissement.coordinates.lat,
                  lng: etablissement.coordinates.long,
                  message: '<div class="md-title">' + etablissement.toString() + '</div>' + etablissement.address.street,
                  focus: true,
                  draggable: false
                }
              }
            });
            /*leafletData.getMap().then(function(map) {
              $timeout(function() {
               // map.invalidateSize();
              });
            });*/
          }
        }, true);
      }
    };
  });
