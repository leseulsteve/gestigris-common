'use strict';

angular.module('gestigris-common').factory('Ville',
  function ($q) {

    var Ville = function (params) {
      _.assign(this, params);
    };

    Ville.prototype.toString = function () {
      return this.name;
    };

    Ville.find = function () {
      var deffered = $q.defer();
      deffered.resolve(_.map([{
        _id: '578bc96bd8916725bb5df181',
        nom: 'Ville de Québec'
      }], function (params) {
        return new Ville(params);
      }));
      return deffered.promise;
    };

    return Ville;

  });
