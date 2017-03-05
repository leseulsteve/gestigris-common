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
  'btford.socket-io',
  'ngLetterAvatar'
]);

'use strict';

angular.module('gestigris-common').config(
  ['$urlRouterProvider', '$httpProvider', 'API_URL', function ($urlRouterProvider, $httpProvider, API_URL) {

    $urlRouterProvider.otherwise('/');

    $httpProvider.interceptors.push(function () {
      return {
        'request': function (config) {
          if (!_.endsWith(config.url, '.html') && !_.endsWith(config.url, '.json') &&  !_.startsWith(config.url, 'http')) {
            var urlPrefix = API_URL;

            if (!_.startsWith(config.url, 'photon')) {

              var route = config.url.split('/')[config.url.split('/').length - 2];

              if (!_.includes(['img', 'icons', '/'], route) && !_.endsWith(config.url, 'md-close.svg') && !_.endsWith(config.url, 'md-tabs-arrow.svg') && !_.endsWith(config.url, 'md-calendar.svg')) {
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
      $rootScope.loadingRoute = false;
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

angular.module('gestigris-common').directive('focusOn',
  ['$parse', '$timeout', function ($parse, $timeout) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        var model = $parse(attrs.focusOn);
        scope.$watch(model, function (value) {
          if (value === true) {
            $timeout(function () {
              element[0].focus();
              element[0].select();
            });
          }
        });
      }
    };
  }]);

'use strict';

angular.module('gestigris-common').directive('grisLogo',
  function () {
    return {
      restrict: 'E',
      template: '<img src="img/0890b3b0.logopng.png" alt="Logo Gris-Québec"/>'
    };
  });

'use strict';

angular.module('gestigris-common').directive('keepLineBreaks',
  function () {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function (scope, element, attrs, ngModelController) {

        ngModelController.$parsers.push(function (value) {
          return value.replace(/\r?\n/g, '<br />');
        });
      }
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

angular.module('gestigris-common').factory('Province',
  ['Schema', function (Schema) {

    var Province = new Schema('adresse/province');

    Province.prototype.toString = function () {
      return this.name;
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
  ['Schema', function (Schema) {

    var Ville = new Schema('adresse/ville');

    Ville.prototype.toString = function () {
      return this.name;
    };

    return Ville;

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
          if (etablissement && !_.isUndefined(etablissement.coordinates)) {
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
                  message: '<div class="md-title">' + etablissement.toString() + '</div>' + etablissement.address.street,
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

angular.module('gestigris-common').factory('CommissionScolaire',
  ['Schema', function (Schema) {

    var CommissionScolaire = new Schema('commission-scolaire');

    CommissionScolaire.prototype.toString = function () {
      return this.name;
    };

    return CommissionScolaire;

  }]);

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
          iElement.css('cursor', 'pointer');
        }

        return function link(scope, element, attrs) {

          scope.showRole = _.isUndefined(attrs.noRole);

          scope.$watch('user', function (user) {

            if (user) {
              scope.hasImage = !_.isUndefined(user.avatar);

              if (_.isUndefined(iAttrs.clickToUpdate)) {

                scope.tooltipText = scope.user.toString();

              } else {

                scope.tooltipText = 'Cliquez pour changer';

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
                      scope: scope,
                      preserveScope: true
                    });

                    fileInput[0].value = '';

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
            }
          }, true);

        };
      },
      controller: ['$scope', function ($scope) {
        this.getUser = function () {
          return $scope.user;
        };
      }]
    };
  }]);

'use strict';

angular.module('gestigris-common').service('Avatar',
  ['$compile', '$rootScope', '$timeout', function ($compile, $rootScope, $timeout) {

    return {
      getDefaultAvatar: function (user) {
        var compiledAvatar = $compile('<ng-letter-avatar shape="round" dynamic="true" data="' + user.toString() + '}"></ng-letter-avatar>')($rootScope.$new());
        return $timeout(function () {
          return compiledAvatar.find('img').attr('src');
        });
      }
    };

  }]);
angular.module('gestigris-common').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('modules/etablissements/views/etablissement.map.html',
    "<leaflet ng-if=center markers=markers lf-center=center></leaflet>"
  );


  $templateCache.put('modules/users/views/avatar.dialog.html',
    "<md-dialog aria-label=\"Changement d'avatar\" style=width:550px;height:450px><md-dialog-content><div class=md-dialog-content><div class=crop-area><img-crop image=myImage result-image=myCroppedImage></img-crop></div></div></md-dialog-content><md-dialog-actions layout=row><md-button ng-click=cancel()>Annuler</md-button><md-button ng-click=change()>Changer</md-button></md-dialog-actions></md-dialog>"
  );


  $templateCache.put('modules/users/views/avatar.html',
    "<div style=position:relative><ng-letter-avatar ng-if=!hasImage shape=round dynamic=true data=\"{{ user.toString() }}\"></ng-letter-avatar><div ng-if=hasImage><img ng-src=\"{{ user.avatar }}\" alt=\"{{ user.toString() }}\"></div><div ng-if=showRole layout=row layout-align=\"center center\" style=position:absolute;top:56px><div class=\"md-whiteframe-3dp md-caption\" style=\"z-index:400;padding-right:4px;padding-left:4px;background:white;border-radius: initial\">{{ user.getRoleDescription() }}</div></div><md-tooltip ng-if=\"user._id !== currentUser._id\">{{ tooltipText }}</md-tooltip></div>"
  );


  $templateCache.put('modules/users/views/login.form.html',
    "<md-card login signin-form flex layout-padding><form name=loginForm novalidate ng-submit=\"loginCtrl.handleLogin(loginForm, credentials)\"><md-card-title><md-card-title-text><span class=md-headline>{{ appName }}</span> <span class=md-subhead>{{ appVersion }}</span><div style=margin-top:50px><md-input-container class=\"md-icon-float md-block\" md-is-error=\"loginForm.$submitted && (loginForm.userName.$error.required || loginForm.userName.$error.email)\"><label translate=LOGIN_FORM.EMAIL.DESCRIPTION></label><md-icon md-svg-icon=communication:mail_outline></md-icon><input flex type=email name=userName required ng-focus=loginForm.$setPristine() ng-model=credentials.username><div ng-messages=loginForm.userName.$error><div ng-message=required><span translate=LOGIN_FORM.EMAIL.ERRORS.REQUIRED></span></div><div ng-message=email><span translate=LOGIN_FORM.EMAIL.ERRORS.INVALID></span></div></div></md-input-container><md-input-container class=\"md-icon-float md-block\" ng-hide=isResetingPassword md-is-error=\"loginForm.$submitted && loginForm.password.$error.required\"><label translate=LOGIN_FORM.PASSWORD.DESCRIPTION></label><md-icon md-svg-icon=action:lock_outline></md-icon><input flex type=password name=password ng-required=!isResetingPassword ng-model=credentials.password><div ng-messages=loginForm.password.$error ng-show=\"loginForm.password.$touched || loginForm.$submitted\"><div ng-message=required><span translate=LOGIN_FORM.PASSWORD.ERRORS.REQUIRED></span></div></div></md-input-container><div ng-show=\"isResetingPassword && loginForm.$submitted && loginForm.$valid\">{{ passwordResetMessage }}</div></div></md-card-title-text><md-card-title-media><div class=\"md-media-lg card-media\" style=width:250px><gris-logo></gris-logo></div></md-card-title-media></md-card-title><md-card-actions layout=row layout-align=\"end center\"><md-button flex=33 class=\"md-raised md-primary\" flex type=submit ng-disabled=isResetingPassword aria-label=\"{{'LOGIN_FORM.BUTTONS.SIGN_IN' | translate}}\" translate=LOGIN_FORM.BUTTONS.SIGN_IN></md-button></md-card-actions></form></md-card>"
  );

}]);
