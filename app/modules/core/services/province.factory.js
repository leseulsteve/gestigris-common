'use strict';

angular.module('gestigris-common').factory('Province',
  function ($q) {

    var Province = function (params) {
      _.assign(this, params);
    };

    Province.prototype.toString = function () {
      return this.name;
    };

    Province.find = function () {
      var deffered = $q.defer();
      deffered.resolve(_.map([{
        _id: '578bc96bd8916725bb4df181',
        name: 'Québec'
      }], function (params) {
        return new Province(params);
      }));
      return deffered.promise;
    };

    return Province;

  });
