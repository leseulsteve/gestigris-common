'use strict';

angular.module('gestigris-common').factory('Province',
  function (Schema) {

    var Province = new Schema('adresse/province');

    Province.prototype.toString = function () {
      return this.name;
    };

    return Province;

  });
