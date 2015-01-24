angular-form-data
-----------------

Lightweight service for transforming request data into FormData object.
Easy-to-use directive for capturing file uploads in model-backed forms.

*Rests upon the shoulders of the examples provided
[here](http://stackoverflow.com/questions/21115771/angularjs-upload-files-using-resource-solution)
and
[here](https://github.com/angular/angular.js/issues/1375#issuecomment-21933012).*

Installation
------------

Download `angular-form-data.min.js` and reference it after AngularJS.

    ...
    <script src="angular.min.js"></script>
    <script src="angular-resource.min.js"></script>
    <script src="angular-form-data.min.js"></script>
    ...

Usage
-----

Inject the `angularFormData` dependency, and use the `$formData` service and
`formDataFilesModel` directive cooperatively.

*HTML:*

    <div ng-app="myApp">
       <div ng-controller="MyCtrl">
          <form novalidate="" name="myForm">
              <div>
                  <label>First Name</label>
                  <input type="text" ng-model="form.name" />
              </div>
              <div>
                  <label>Profile Image</label>
                  <input type="file" form-data-files-model="form.image" />
              </div>
              <div>
                  <button ng-click="submit()">Submit</button>
              </div>
          </form>
       </div>
    </div>

*JS:*
    
    var myApp = angular.module('myApp', ['ngResource', 'angularFormData']);

    myApp.factory('MyResource', function ($resource, $formData) {
        var $r = $resource('/echo/json/', {}, {
            create: {
                method: 'POST',
                transformRequest: function (data, headersGetter) {
                    return $formData.prepare(data, headersGetter);
                }
            }
        });

        return $r;
    });

    myApp.controller('MyCtrl', function ($scope, MyResource) {
        $scope.submit = function () {
            MyResource.create($scope.form).$promise.then(function (res) {
                console.log(res);
            });
        };
    }); 


Demo
----

See a demonstration Fiddle [here](http://jsfiddle.net/tbloncar/kkq75qjh/).

License
-------

Copyright (c) 2015 Travis Loncar

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
MIT
