'use strict';

angular.module('gestigris-common').directive('grisLogo',
  function () {
    return {
      restrict: 'E',
      template: '<img src="img/logopng.png" alt="Logo Gris-Québec"/>'
    };
  });
