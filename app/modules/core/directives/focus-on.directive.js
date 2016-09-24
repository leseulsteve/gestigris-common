'use strict';

angular.module('gestigris-common').directive('focusOn',
  function ($parse, $timeout) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        var model = $parse(attrs.focusOn);
        scope.$watch(model, function (value) {
          if (value === true) {
            $timeout(function () {
              element[0].focus();
              element[0].select();
            });
          }
        });
      }
    };
  });
