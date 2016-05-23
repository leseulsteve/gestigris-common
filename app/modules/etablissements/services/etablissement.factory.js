'use strict';

angular.module('gestigris-common').factory('Etablissement',
  function (Schema) {

    var Etablissement = new Schema('etablissement');

    Etablissement.prototype.toString = function () {
      return this.name;
    };

    Etablissement.prototype.getImageUrl = function () {
      return this.imageUrl;
    };

    return Etablissement;

  });
