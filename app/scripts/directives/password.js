angular.module('EVA-Webapp-groep-17').

directive('compareTo', function() {
  return {
    require: 'ngModel',
    scope: {
            otherModelValue: "=compareTo"
        },
    link: function(scope, element, attributes, ngModel) {
      ngModel.$validators.compareTo = function(modelValue, viewValue) {

        return modelValue == scope.otherModelValue;
            };

            scope.$watch("otherModelValue", function() {
                ngModel.$validate();
            });
        }
    };
});