'use strict';

angular.module('gestigris-common', [
  'ngAnimate',
  'ngSanitize',
  'ngMessages',
  'ui.router',
  'ngMaterial',
  'leseulsteve.angular-mongoose',
  'leseulsteve.angular-user-auth',
  'pascalprecht.translate',
  'btford.socket-io'
]);

'use strict';

angular.module('core').config(
  ['$urlRouterProvider', '$httpProvider', function ($urlRouterProvider, $httpProvider) {

    $urlRouterProvider.otherwise('/');

    $httpProvider.interceptors.push(function () {
      return {
        'request': function (config) {
          if (!_.endsWith(config.url, '.html') && !_.endsWith(config.url, '.json') &&  !_.startsWith(config.url, 'http')) {
            //var urlPrefix = 'http://vps54578.vps.ovh.ca:90',
            var urlPrefix = 'http://localhost:9011',

              route = config.url.split('/')[config.url.split('/').length - 2];

            if (!_.contains(['img', 'icons', '/'], route)) {
              urlPrefix += '/api/v1';
              config.url = urlPrefix + '/' + config.url;
            }

          }
          return config;
        }
      };
    });
  }]);

'use strict';

angular.module('core')
  .config(['$translateProvider', function ($translateProvider) {

    //$translateProvider.useSanitizeValueStrategy('sanitize');

    $translateProvider.useStaticFilesLoader({
      prefix: 'translations/locale-',
      suffix: '.json'
    });

    $translateProvider.preferredLanguage('fr_CA');
  }]);

'use strict';

angular.module('core').service('Moment',
  function () {
    return moment;
  });

'use strict';

angular.module('core').service('Toast',
  ['$mdMedia', '$mdToast', function ($mdMedia, $mdToast) {

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

  }]);

'use strict';

angular.module('core')
  .config(['$mdIconProvider', function ($mdIconProvider) {
    $mdIconProvider
      .iconSet('action', 'icons/99632812.action-icons.svg', 24)
      .iconSet('alert', 'icons/3d062121.alert-icons.svg', 24)
      .iconSet('av', 'icons/12727965.av-icons.svg', 24)
      .iconSet('communication', 'icons/14a6ec88.communication-icons.svg', 24)
      .iconSet('content', 'icons/d73de9e3.content-icons.svg', 24)
      .iconSet('device', 'icons/98f8d921.device-icons.svg', 24)
      .iconSet('editor', 'icons/bbf5607a.editor-icons.svg', 24)
      .iconSet('file', 'icons/96f6b24b.file-icons.svg', 24)
      .iconSet('hardware', 'icons/90548e26.hardware-icons.svg', 24)
      .iconSet('icons', 'icons/icons-icons.svg', 24)
      .iconSet('image', 'icons/a0577dd0.image-icons.svg', 24)
      .iconSet('maps', 'icons/ea99afd9.maps-icons.svg', 24)
      .iconSet('navigation', 'icons/9edaa8f8.navigation-icons.svg', 24)
      .iconSet('notification', 'icons/80d43d2a.notification-icons.svg', 24)
      .iconSet('social', 'icons/39ce2056.social-icons.svg', 24)
      .iconSet('toggle', 'icons/a0cd50cd.toggle-icons.svg', 24);
  }]);

'use strict';

angular.module('gestigris-common')
  .config(['$mdThemingProvider', function ($mdThemingProvider) {

    var vertGris = $mdThemingProvider.extendPalette('green', {
      '500': '859D47'
    });

    var orangeGris = $mdThemingProvider.extendPalette('orange', {
      'A200': 'F26533'
    });

    var redGris = $mdThemingProvider.extendPalette('red', {
      '500': 'EC2F58'
    });

    $mdThemingProvider.definePalette('vertGris', vertGris);
    $mdThemingProvider.definePalette('orangeGris', orangeGris);
    $mdThemingProvider.definePalette('redGris', redGris);

  }]);
