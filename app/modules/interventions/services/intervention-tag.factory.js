'use strict';

angular.module('gestigris-common').factory('InterventionTag',
  function (Schema) {

    var InterventionTag = new Schema('intervention-tag');

    InterventionTag.prototype.toString = function () {
      return this.name;
    };

    return InterventionTag;

  });
