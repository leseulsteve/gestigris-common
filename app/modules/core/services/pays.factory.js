'use strict';

angular.module('gestigris-common').factory('Pays',
  function ($q) {

    var Pays = function (params) {
      _.assign(this, params);
    };

    Pays.prototype.toString = function () {
      return this.name;
    };

    Pays.find = function () {
      var deffered = $q.defer();
      deffered.resolve(_.map([{
        _id: '578bc96bd8916725bb4df182',
        nom: 'Canada'
      }], function (params) {
        return new Pays(params);
      }));
      return deffered.promise;
    };

    return Pays;

  });
