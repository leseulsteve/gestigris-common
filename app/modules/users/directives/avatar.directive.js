'use strict';

angular.module('gestigris-common').directive('avatar',
  function ($mdDialog) {
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
            }
          }, true);

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
        };
      }
    };
  });
