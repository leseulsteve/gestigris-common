'use strict';

angular.module('gestigris-common').service('Moment',
  function () {
    moment.locale('ca-fr');
    return moment;
  });
