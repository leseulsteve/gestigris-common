'use strict';

angular.module('gestigris-common').factory('Arrondissement',
  function (Schema) {

    var Arrondissement = new Schema('adresse/arrondissement');

    Arrondissement.prototype.toString = function () {
      return this.name;
    };

    return Arrondissement;

  });
