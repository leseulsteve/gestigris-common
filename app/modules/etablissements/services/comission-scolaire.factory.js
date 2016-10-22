'use strict';

angular.module('gestigris-common').factory('ComissionScolaire',
  function (Schema) {

    var ComissionScolaire = new Schema('comission-scolaire');

    ComissionScolaire.prototype.toString = function () {
      return this.name;
    };

    return ComissionScolaire;

  });
