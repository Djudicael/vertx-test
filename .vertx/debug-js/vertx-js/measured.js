/*
 * Copyright 2014 Red Hat, Inc.
 *
 * Red Hat licenses this file to you under the Apache License, version 2.0
 * (the "License"); you may not use this file except in compliance with the
 * License.  You may obtain a copy of the License at:
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */

/** @module vertx-js/measured */
var utils = require('vertx-js/util/utils');

var io = Packages.io;
var JsonObject = io.vertx.core.json.JsonObject;
var JMeasured = Java.type('io.vertx.core.metrics.Measured');

/**

 @class
*/
var Measured = function(j_val) {

  var j_measured = j_val;
  var that = this;

  var __super_isMetricsEnabled = this.isMetricsEnabled;
  /**
   Whether the metrics are enabled for this measured object

   @public

   @return {boolean} <code>true</code> if metrics are enabled
   */
  this.isMetricsEnabled =  function() {
    var __args = arguments;
    if (__args.length === 0) {
      return j_measured["isMetricsEnabled()"]() ;
    } else if (typeof __super_isMetricsEnabled != 'undefined') {
      return __super_isMetricsEnabled.apply(this, __args);
    }
    else throw new TypeError('function invoked with invalid arguments');
  };

  // A reference to the underlying Java delegate
  // NOTE! This is an internal API and must not be used in user code.
  // If you rely on this property your code is likely to break if we change it / remove it without warning.
  this._jdel = j_measured;
};

Measured._jclass = utils.getJavaClass("io.vertx.core.metrics.Measured");
Measured._jtype = {accept: function(obj) {
    return Measured._jclass.isInstance(obj._jdel);
  },wrap: function(jdel) {
    var obj = Object.create(Measured.prototype, {});
    Measured.apply(obj, arguments);
    return obj;
  },
  unwrap: function(obj) {
    return obj._jdel;
  }
};
Measured._create = function(jdel) {var obj = Object.create(Measured.prototype, {});
  Measured.apply(obj, arguments);
  return obj;
}
module.exports = Measured;