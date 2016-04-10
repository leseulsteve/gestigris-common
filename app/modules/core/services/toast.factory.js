'use strict';

angular.module('gestigris-common').service('Toast',
  function ($mdMedia, $mdToast) {

    var Toast = function (params) {
      this.position = $mdMedia('sm') ? 'bottom fit' : 'bottom right';

      if (_.isString(params)) {
        this.template = '<md-toast>' + params + '</md-toast>';
      } else {
        _.assign(this, params);
      }
    };

    Toast.prototype.show = function () {
      $mdToast.show(this);
    };

    return Toast;

  });
