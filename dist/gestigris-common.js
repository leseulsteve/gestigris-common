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

angular.module('gestigris-common').config(
  ['$urlRouterProvider', '$httpProvider', function ($urlRouterProvider, $httpProvider) {

    $urlRouterProvider.otherwise('/');

    $httpProvider.interceptors.push(function () {
      return {
        'request': function (config) {
          if (!_.endsWith(config.url, '.html') && !_.endsWith(config.url, '.json') &&  !_.startsWith(config.url, 'http')) {
            //var urlPrefix = 'http://vps54578.vps.ovh.ca:90',
            var urlPrefix = 'http://localhost:9011',

              route = config.url.split('/')[config.url.split('/').length - 2];

            if (!_.contains(['img', 'icons', '/'], route) && !_.endsWith(config.url, 'md-close.svg') && !_.endsWith(config.url, 'md-tabs-arrow.svg')) {
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

angular.module('gestigris-common').run(
  ['$rootScope', '$mdMedia', function ($rootScope, $mdMedia) {

    $rootScope.$mdMedia = $mdMedia;

    $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
      console.error('$stateChangeError: ', toState, error);
    });

    $rootScope.$on('$stateChangeStart', function () {
      $rootScope.loadingRoute = true;
    });

    $rootScope.$on('$stateChangeSuccess', function () {
      $rootScope.loadingRoute = false;
    });

  }]);

'use strict';

angular.module('gestigris-common')
  .config(['$translateProvider', function ($translateProvider) {

    //$translateProvider.useSanitizeValueStrategy('sanitize');

    $translateProvider.useStaticFilesLoader({
      prefix: 'translations/locale-',
      suffix: '.json'
    });

    $translateProvider.preferredLanguage('fr_CA');
  }]);

'use strict';

angular.module('gestigris-common').service('Moment',
  function () {
    moment.locale('ca-fr');
    return moment;
  });

'use strict';

angular.module('gestigris-common').service('Toast',
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

angular.module('gestigris-common')
  .config(['$mdIconProvider', function ($mdIconProvider) {
    $mdIconProvider
      .iconSet('action', 'icons/2e79e525.action-icons.svg', 24)
      .iconSet('alert', 'icons/3741059a.alert-icons.svg', 24)
      .iconSet('av', 'icons/a38ceb29.av-icons.svg', 24)
      .iconSet('communication', 'icons/bf15dd98.communication-icons.svg', 24)
      .iconSet('content', 'icons/ab09cba1.content-icons.svg', 24)
      .iconSet('device', 'icons/b9b28764.device-icons.svg', 24)
      .iconSet('editor', 'icons/f52685d0.editor-icons.svg', 24)
      .iconSet('file', 'icons/d2796357.file-icons.svg', 24)
      .iconSet('hardware', 'icons/1f0d2702.hardware-icons.svg', 24)
      .iconSet('icons', 'icons/icons-icons.svg', 24)
      .iconSet('image', 'icons/2dd80997.image-icons.svg', 24)
      .iconSet('maps', 'icons/b8bbfe80.maps-icons.svg', 24)
      .iconSet('navigation', 'icons/2ce70a82.navigation-icons.svg', 24)
      .iconSet('notification', 'icons/23324a04.notification-icons.svg', 24)
      .iconSet('social', 'icons/301cdf30.social-icons.svg', 24)
      .iconSet('toggle', 'icons/4e19389b.toggle-icons.svg', 24);
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
