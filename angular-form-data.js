/**
 * AngularJS FormData
 *
 * @author Travis Loncar <loncar.travis@gmail.com>
 * @license MIT
 */

(function () {

    var aFormData = angular.module('angularFormData', []);

    aFormData.service('$formData', [function () {

        function buildFormData(data) {
            var formData = new FormData(),
                keys;

            function createKeys(_keys_, currentKey) {
                var formKey;

                keys = angular.copy(_keys_);
                keys.push(currentKey);
                formKey = keys.shift();

                if (keys.length) {
                    formKey += "[" + keys.join("][") + "]";
                }

                return formKey;
            }

            function addToFormData(object, keys) {
                keys = (typeof keys !== 'undefined') ? keys : [];

                angular.forEach(object, function (value, key) {
                    if (value instanceof FileList) {
                        var formKey = createKeys(keys, key);

                        if (value.length === 1) {
                            formData.append(formKey, value[0]);
                        } else {
                            angular.forEach(value, function (file, index) {
                                formData.append(formKey + '[' + index + ']', file);
                            });
                        }
                    } else if (value && (typeof value === 'object')) {
                        var _keys = angular.copy(keys);

                        _keys.push(key);
                        addToFormData(value, _keys);
                    } else {
                        formKey = createKeys(keys, key);
                        formData.append(formKey, value);
                    }
                });
            }

            addToFormData(data);

            return formData;
        }

        /**
         * Package (request) data as FormData object.
         *
         * @param {object} data - Data payload.
         * @param {function} headersGetter - headersGetter from request transform 
         */
        this.prepare = function (data, headersGetter) {
            if (data === undefined) return;

            // Prevent server parse error
            headersGetter()['Content-Type'] = undefined;
            return buildFormData(data);
        };
    }]);

    aFormData.directive('formDataFilesModel', [function () {
        return {
            controller: function ($parse, $element, $attrs, $scope) {
                var modelExp = $parse($attrs.formDataFilesModel);

                $element.on('change', function () {
                    var formExp;
                    
                    modelExp.assign($scope, this.files);
                    
                    if($attrs.formDataForm) {
                        formExp = $parse($attrs.formDataForm);
                        formExp.$dirty = true;
                        formExp.assign($scope, formExp);
                    }
                    
                    $scope.$apply();
                });
            }
        };
    }]);
})();