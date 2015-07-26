/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

angular.module('zeppelinWebApp').service('dataValidatorSrv', function($rootScope, dataValidator, dataModelSchemas) {

  this.validateMapData = function(data) {
    var mapValidator = new dataValidator();
    mapValidator.schema = dataModelSchemas.MapSchema;
    mapValidator.checkData(data,mapValidator.schema);
    var msg = {'error':mapValidator.error(), 'msg':mapValidator.getMsg()};
    return msg;
  };

});
