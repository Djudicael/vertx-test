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

/** @module vertx-js/stream_base */
var utils = require('vertx-js/util/utils');

var io = Packages.io;
var JsonObject = io.vertx.core.json.JsonObject;
var JStreamBase = Java.type('io.vertx.core.streams.StreamBase');

/**
 Base interface for a stream.

 @class
*/
var StreamBase = function(j_val) {

  var j_streamBase = j_val;
  var that = this;

  var __super_exceptionHandler = this.exceptionHandler;
  /**
   Set an exception handler.

   @public
   @param handler {function} the handler 
   @return {StreamBase} a reference to this, so the API can be used fluently
   */
  this.exceptionHandler =  function(handler) {
    var __args = arguments;
    if (__args.length === 1 && (typeof __args[0] === 'function' || __args[0] == null)) {
      j_streamBase["exceptionHandler(io.vertx.core.Handler)"](handler == null ? null : function(jVal) {
        handler(utils.convReturnThrowable(jVal));
      }) ;
      return that;
    } else if (typeof __super_exceptionHandler != 'undefined') {
      return __super_exceptionHandler.apply(this, __args);
    }
    else throw new TypeError('function invoked with invalid arguments');
  };

  // A reference to the underlying Java delegate
  // NOTE! This is an internal API and must not be used in user code.
  // If you rely on this property your code is likely to break if we change it / remove it without warning.
  this._jdel = j_streamBase;
};

StreamBase._jclass = utils.getJavaClass("io.vertx.core.streams.StreamBase");
StreamBase._jtype = {accept: function(obj) {
    return StreamBase._jclass.isInstance(obj._jdel);
  },wrap: function(jdel) {
    var obj = Object.create(StreamBase.prototype, {});
    StreamBase.apply(obj, arguments);
    return obj;
  },
  unwrap: function(obj) {
    return obj._jdel;
  }
};
StreamBase._create = function(jdel) {var obj = Object.create(StreamBase.prototype, {});
  StreamBase.apply(obj, arguments);
  return obj;
}
module.exports = StreamBase;