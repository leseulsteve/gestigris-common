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
  'leaflet-directive',
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
            var urlPrefix = 'http://localhost:9011';

            if (!_.startsWith(config.url, 'photon')) {

              var route = config.url.split('/')[config.url.split('/').length - 2];

              if (!_.includes(['img', 'icons', '/'], route) && !_.endsWith(config.url, 'md-close.svg') && !_.endsWith(config.url, 'md-tabs-arrow.svg')) {
                urlPrefix += '/api/v1';
                config.url = urlPrefix + '/' + config.url;
              }

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
    $rootScope._ = window._;

    $rootScope.$on('$stateChangeSuccess', function () {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    });

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

angular.module('gestigris-common').directive('grisLogo',
  function () {
    return {
      restrict: 'E',
      template: '<img src="img/509ceaee.logopng.png" alt="Logo Gris-Québec"/>'
    };
  });

'use strict';

angular.module('gestigris-common').factory('Arrondissement',
  ['Schema', function (Schema) {

    var Arrondissement = new Schema('adresse/arrondissement');

    Arrondissement.prototype.toString = function () {
      return this.name;
    };

    return Arrondissement;

  }]);

'use strict';

angular.module('gestigris-common').service('Moment',
  function () {
    moment.locale('ca-fr');
    return moment;
  });

'use strict';

angular.module('gestigris-common').factory('Pays',
  ['$q', function ($q) {

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
        name: 'Canada'
      }], function (params) {
        return new Pays(params);
      }));
      return deffered.promise;
    };

    return Pays;

  }]);

'use strict';

angular.module('gestigris-common').factory('Province',
  ['$q', function ($q) {

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

  }]);

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

angular.module('gestigris-common').factory('Ville',
  ['$q', function ($q) {

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
        name: 'Ville de Québec'
      }], function (params) {
        return new Ville(params);
      }));
      return deffered.promise;
    };

    return Ville;

  }]);

'use strict';

angular.module('gestigris-common').directive('etablissementImage',
  ['Etablissement', function (Etablissement) {

    var etablissements = {};

    return {
      restrict: 'E',
      templateUrl: 'modules/etablissements/views/etablissement.image.html',
      link: function (scope, element, attrs) {

        function setImage() {
          scope.image = scope.etablissement.getImageUrl();
          if (scope.image) {
            var imageElement = element.find('img');
            imageElement.bind('load', function () {
              scope.$broadcast('imageLoaded');
              scope.$apply();
            });
          } else {
            scope.$broadcast('imageLoaded');
          }
        }

        scope.$watch(attrs.etablissementId, function (etablissementId) {
          if (!_.isUndefined(etablissementId)) {

            scope.etablissement = etablissements[etablissementId];

            if (_.isUndefined(scope.etablissement)) {
              Etablissement.findById(etablissementId).then(function (etablissement) {
                scope.etablissement = etablissement;
                setImage();
                etablissements[etablissementId] = etablissement;
              });
            } else {
              setImage();
            }
          }
        });

        scope.$watch(attrs.etablissement, function (etablissement) {
          if (!_.isUndefined(etablissement)) {

            etablissements[etablissement._id] = etablissement;
            //  scope.etablissement = etablissement;

            setImage();

          }
        });
      }
    };
  }]);

'use strict';

angular.module('gestigris-common').directive('etablissementMap',
  function () {
    return {
      restrict: 'E',
      scope: true,
      replace: true,
      templateUrl: 'modules/etablissements/views/etablissement.map.html',
      link: function (scope, element, attrs) {

        scope.$watch(attrs.etablissement, function (etablissement) {
          if (!_.isUndefined(etablissement.coordinates)) {
            angular.extend(scope, {
              center: {
                lat: etablissement.coordinates.lat,
                lng: etablissement.coordinates.long,
                zoom: 15
              },
              markers: {
                etablissement: {
                  lat: etablissement.coordinates.lat,
                  lng: etablissement.coordinates.long,
                  message: etablissement.address.street,
                  focus: true,
                  draggable: false
                }
              }
            });
            /*leafletData.getMap().then(function(map) {
              $timeout(function() {
               // map.invalidateSize();
              });
            });*/
          }
        }, true);
      }
    };
  });

'use strict';

angular.module('gestigris-common').factory('EtablissementType',
  ['Schema', function (Schema) {

    var EtablissementType = new Schema('etablissement-type');

    EtablissementType.prototype.toString = function () {
      return this.name;
    };

    return EtablissementType;

  }]);

'use strict';

angular.module('gestigris-common').factory('Etablissement',
  ['Schema', function (Schema) {

    var Etablissement = new Schema('etablissement');

    Etablissement.prototype.toString = function () {
      return this.name;
    };

    Etablissement.prototype.getImageUrl = function () {
      return this.imageUrl;
    };

    return Etablissement;

  }]);

'use strict';

angular.module('gestigris-common')
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

    $mdThemingProvider.theme('default')
      .primaryPalette('vertGris')
      .accentPalette('orangeGris')
      .warnPalette('redGris');
  }]);

'use strict';

angular.module('gestigris-common')
  .config(['$stateProvider', function ($stateProvider) {

    $stateProvider.

    state('login', {
      url: '/connexion',
      templateUrl: 'modules/users/views/login.form.html',
      controller: 'LoginController',
      controllerAs: 'loginCtrl'
    });
  }]);

'use strict';

angular.module('gestigris-common').controller('LoginController',
  ['$scope', '$state', 'APP', function ($scope, $state, APP) {

    $scope.appName = APP.name;
    $scope.appVersion = APP.version;

    this.handleLogin = function (loginForm, credentials) {
      $scope.signin(loginForm, credentials);
    };

    this.handleLogedIn = function () {
      $state.go('interventions');
    };
  }]);

'use strict';

angular.module('gestigris-common').directive('avatar',
  ['$mdDialog', function ($mdDialog) {
    return {
      restrict: 'E',
      scope: {
        user: '='
      },
      templateUrl: 'modules/users/views/avatar.html',
      compile: function (iElement, iAttrs) {

        iElement.addClass('md-whiteframe-3dp');

        if (!_.isUndefined(iAttrs.clickToUpdate)) {
          iElement.append('<input style="display:none;" type="file"/>');
          iElement.append('<div class="md-caption text-center">Cliquez pour changer</div>');
          iElement.css('cursor', 'pointer');
        }

        return function link(scope, element) {

          scope.$watch('user', function (user) {
            if (user) {
              scope.hasImage = !_.isUndefined(user.avatar);
            }
          }, true);

          if (!_.isUndefined(iAttrs.clickToUpdate)) {

            var fileInput = element.find('input');

            element.bind('click', function () {
              fileInput[0].click();
            });

            fileInput.bind('change', function ($event) {

              var reader = new FileReader();

              scope.myImage = '';
              scope.myCroppedImage = '';

              reader.onload = function ($event) {
                scope.$apply(function () {
                  scope.myImage = $event.target.result;
                });

                $mdDialog.show({
                  templateUrl: 'modules/users/views/avatar.dialog.html',
                  parent: angular.element(document.body),
                  targetEvent: $event,
                  scope: scope,
                  preserveScope: true
                });

                scope.change = function () {
                  scope.user.avatar = scope.myCroppedImage;
                  scope.user.save().then(function (savedUser) {
                    $mdDialog.hide();
                    _.assign(scope.user, savedUser);
                  });
                };

                scope.cancel = function () {
                  $mdDialog.hide();
                };
              };

              reader.readAsDataURL($event.currentTarget.files[0]);

            });

          }
        };
      }
    };
  }]);
angular.module('gestigris-common').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('modules/etablissements/views/etablissement.image.html',
    "<img ng-show=image ng-src=\"{{ image }}\" alt=\"{{ etablissement.toString() }}\" style=height:200px><div ng-show=!image layout=column layout-align=\"center center\" style=height:200px><p class=md-headline style=\"text-align: center\">{{ etablissement.toString() }}</p></div>"
  );


  $templateCache.put('modules/etablissements/views/etablissement.map.html',
    "<leaflet ng-if=center markers=markers lf-center=center></leaflet>"
  );


  $templateCache.put('modules/users/views/avatar.html',
    "<div><md-icon ng-if=!hasImage md-svg-icon=action:face alt=user.toString()><md-tooltip ng-if=\"user._id !== currentUser._id\">{{ user.toString() }}</md-tooltip></md-icon><div ng-if=hasImage><img ng-src=\"{{ user.avatar }}\" alt=\"{{ user.toString() }}\"><md-tooltip ng-if=\"user._id !== currentUser._id\">{{ user.toString() }}</md-tooltip></div></div>"
  );


  $templateCache.put('modules/users/views/login.form.html',
    "<md-card login signin-form flex layout-padding><form name=loginForm novalidate ng-submit=\"loginCtrl.handleLogin(loginForm, credentials)\"><md-card-title><md-card-title-text><span class=md-headline>{{ appName }}</span> <span class=md-subhead>Beta 1</span><div style=margin-top:50px><md-input-container class=\"md-icon-float md-block\" md-is-error=\"loginForm.$submitted && (loginForm.userName.$error.required || loginForm.userName.$error.email)\"><label translate=LOGIN_FORM.EMAIL.DESCRIPTION></label><md-icon md-svg-icon=communication:mail_outline></md-icon><input flex type=email name=userName required ng-focus=loginForm.$setPristine() ng-model=credentials.username><div ng-messages=loginForm.userName.$error><div ng-message=required><span translate=LOGIN_FORM.EMAIL.ERRORS.REQUIRED></span></div><div ng-message=email><span translate=LOGIN_FORM.EMAIL.ERRORS.INVALID></span></div></div></md-input-container><md-input-container class=\"md-icon-float md-block\" ng-hide=isResetingPassword md-is-error=\"loginForm.$submitted && loginForm.password.$error.required\"><label translate=LOGIN_FORM.PASSWORD.DESCRIPTION></label><md-icon md-svg-icon=action:lock_outline></md-icon><input flex type=password name=password ng-required=!isResetingPassword ng-model=credentials.password><div ng-messages=loginForm.password.$error ng-show=\"loginForm.password.$touched || loginForm.$submitted\"><div ng-message=required><span translate=LOGIN_FORM.PASSWORD.ERRORS.REQUIRED></span></div></div></md-input-container><div ng-show=\"isResetingPassword && loginForm.$submitted && loginForm.$valid\">{{ passwordResetMessage }}</div></div></md-card-title-text><md-card-title-media><div class=\"md-media-lg card-media\" style=width:250px><gris-logo></gris-logo></div></md-card-title-media></md-card-title><md-card-actions layout=row layout-align=\"end center\"><md-button flex=33 class=\"md-raised md-primary\" flex type=submit ng-disabled=isResetingPassword aria-label=\"{{'LOGIN_FORM.BUTTONS.SIGN_IN' | translate}}\" translate=LOGIN_FORM.BUTTONS.SIGN_IN></md-button></md-card-actions></form></md-card>"
  );

}]);
