'use strict';

angular.module('gestigris-common').service('Avatar',
  function ($compile, $rootScope, $timeout) {

    return {
      getDefaultAvatar: function (user) {
        var compiledAvatar = $compile('<ng-letter-avatar shape="round" dynamic="true" data="' + user.toString() + '}"></ng-letter-avatar>')($rootScope.$new());
        return $timeout(function () {
          return compiledAvatar.find('img').attr('src');
        });
      }
    };

  });
