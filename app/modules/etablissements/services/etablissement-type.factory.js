'use strict';

angular.module('gestigris-common').factory('EtablissementType',
  function (Schema) {

    var EtablissementType = new Schema('etablissement-type');

    EtablissementType.prototype.toString = function () {
      return this.name;
    };

    return EtablissementType;

  });
