'use strict';

angular.module('gestigris-common').factory('Ville',
  function (Schema) {

    var Ville = new Schema('adresse/ville');

    Ville.prototype.toString = function () {
      return this.name;
    };

    return Ville;

  });
