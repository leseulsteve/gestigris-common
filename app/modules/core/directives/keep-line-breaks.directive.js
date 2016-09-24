'use strict';

angular.module('gestigris-common').directive('keepLineBreaks',
  function () {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function (scope, element, attrs, ngModelController) {

        ngModelController.$parsers.push(function (value) {
          return value.replace(/\r?\n/g, '<br />');
        });
      }
    };
  });
