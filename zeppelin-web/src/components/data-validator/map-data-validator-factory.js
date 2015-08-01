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

angular.module('zeppelinWebApp').factory('mapdataValidator', function(
  $rootScope, DataValidator, dataModelSchemas) {

  var msg = '';
  var errorStatus = false;
  var mapSchema = dataModelSchemas.MapSchema;

  var mapdataValidator = new DataValidator(mapSchema);
  mapdataValidator.checkLatiLong = function() {
    var data = mapdataValidator.data.rows;
    msg = '';
    for(var i = 0; i < data.length; i++) {
      latitudeValidator(data[i][2], mapSchema.range);
      longitudeValidator(data[i][3], mapSchema.range);
      if(errorStatus) {
        mapdataValidator.setError();
      }
    }
    mapdataValidator.setMsg(msg);
    return;
  };

  //Latitude measurements range from 0° to (+/–)90°.
  function latitudeValidator(record, schema) {
    var latitude = parseFloat(record);
    if(schema.latitude.low < latitude && latitude < schema.latitude.high) {
      msg += 'latitudes are ok | ';
      return;
    }
    msg += 'Latitude ' + record + ' is not in range | ';
    errorStatus = true;
    return;
  }

  //Longitude measurements range from 0° to (+/–)180°.
  function longitudeValidator(record, schema) {
    var longitude = parseFloat(record);
    console.log(schema.longitude.low < longitude);
    if(schema.longitude.low < longitude && longitude < schema.longitude.high) {
      msg += 'longitude are ok | ';
      return;
    }
    msg += 'Longitude' + record + ' is not in range | ';
    errorStatus = true;
    return;
  }

  return mapdataValidator;
});