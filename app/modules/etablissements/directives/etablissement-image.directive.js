'use strict';

angular.module('gestigris-common').directive('etablissementImage',
  function (Etablissement) {

    var etablissements = {};

    return {
      restrict: 'E',
      templateUrl: 'modules/etablissements/views/etablissement.image.html',
      link: function (scope, element, attrs) {

        function setImage() {
          scope.image = scope.etablissement.getImageUrl();
          if (scope.image) {
            var imageElement = element.find('img');
            imageElement.bind('load', function () {
              scope.$broadcast('imageLoaded');
              scope.$apply();
            });
          } else {
            scope.$broadcast('imageLoaded');
          }
        }

        scope.$watch(attrs.etablissementId, function (etablissementId) {
          if (!_.isUndefined(etablissementId)) {

            scope.etablissement = etablissements[etablissementId];

            if (_.isUndefined(scope.etablissement)) {
              Etablissement.findById(etablissementId).then(function (etablissement) {
                scope.etablissement = etablissement;
                setImage();
                etablissements[etablissementId] = etablissement;
              });
            } else {
              setImage();
            }
          }
        });

        scope.$watch(attrs.etablissement, function (etablissement) {
          if (!_.isUndefined(etablissement)) {

            etablissements[etablissement._id] = etablissement;
          //  scope.etablissement = etablissement;

            setImage();

          }
        });
      }
    };
  });
