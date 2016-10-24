'use strict';

angular.module('gestigris-common').factory('CommissionScolaire',
  function (Schema) {

    var CommissionScolaire = new Schema('commission-scolaire');

    CommissionScolaire.prototype.toString = function () {
      return this.name;
    };

    return CommissionScolaire;

  });
