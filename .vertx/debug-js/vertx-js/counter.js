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

/** @module vertx-js/counter */
var utils = require('vertx-js/util/utils');

var io = Packages.io;
var JsonObject = io.vertx.core.json.JsonObject;
var JCounter = Java.type('io.vertx.core.shareddata.Counter');

/**
 An asynchronous counter that can be used to across the cluster to maintain a consistent count.
 <p>


 @class
*/
var Counter = function(j_val) {

  var j_counter = j_val;
  var that = this;

  var __super_get = this.get;
  var __super_incrementAndGet = this.incrementAndGet;
  var __super_getAndIncrement = this.getAndIncrement;
  var __super_decrementAndGet = this.decrementAndGet;
  var __super_addAndGet = this.addAndGet;
  var __super_getAndAdd = this.getAndAdd;
  var __super_compareAndSet = this.compareAndSet;
  /**
   Get the current value of the counter

   @public
   @param resultHandler {function} handler which will be passed the value 
   */
  this.get =  function(resultHandler) {
    var __args = arguments;
    if (__args.length === 1 && typeof __args[0] === 'function') {
      j_counter["get(io.vertx.core.Handler)"](function(ar) {
        if (ar.succeeded()) {
          __args[0](utils.convReturnLong(ar.result()), null);
        } else {
          __args[0](null, ar.cause());
        }
      });
    } else if (typeof __super_get != 'undefined') {
      return __super_get.apply(this, __args);
    }
    else throw new TypeError('function invoked with invalid arguments');
  };

  /**
   Increment the counter atomically and return the new count

   @public
   @param resultHandler {function} handler which will be passed the value 
   */
  this.incrementAndGet =  function(resultHandler) {
    var __args = arguments;
    if (__args.length === 1 && typeof __args[0] === 'function') {
      j_counter["incrementAndGet(io.vertx.core.Handler)"](function(ar) {
        if (ar.succeeded()) {
          __args[0](utils.convReturnLong(ar.result()), null);
        } else {
          __args[0](null, ar.cause());
        }
      });
    } else if (typeof __super_incrementAndGet != 'undefined') {
      return __super_incrementAndGet.apply(this, __args);
    }
    else throw new TypeError('function invoked with invalid arguments');
  };

  /**
   Increment the counter atomically and return the value before the increment.

   @public
   @param resultHandler {function} handler which will be passed the value 
   */
  this.getAndIncrement =  function(resultHandler) {
    var __args = arguments;
    if (__args.length === 1 && typeof __args[0] === 'function') {
      j_counter["getAndIncrement(io.vertx.core.Handler)"](function(ar) {
        if (ar.succeeded()) {
          __args[0](utils.convReturnLong(ar.result()), null);
        } else {
          __args[0](null, ar.cause());
        }
      });
    } else if (typeof __super_getAndIncrement != 'undefined') {
      return __super_getAndIncrement.apply(this, __args);
    }
    else throw new TypeError('function invoked with invalid arguments');
  };

  /**
   Decrement the counter atomically and return the new count

   @public
   @param resultHandler {function} handler which will be passed the value 
   */
  this.decrementAndGet =  function(resultHandler) {
    var __args = arguments;
    if (__args.length === 1 && typeof __args[0] === 'function') {
      j_counter["decrementAndGet(io.vertx.core.Handler)"](function(ar) {
        if (ar.succeeded()) {
          __args[0](utils.convReturnLong(ar.result()), null);
        } else {
          __args[0](null, ar.cause());
        }
      });
    } else if (typeof __super_decrementAndGet != 'undefined') {
      return __super_decrementAndGet.apply(this, __args);
    }
    else throw new TypeError('function invoked with invalid arguments');
  };

  /**
   Add the value to the counter atomically and return the new count

   @public
   @param value {number} the value to add 
   @param resultHandler {function} handler which will be passed the value 
   */
  this.addAndGet =  function(value, resultHandler) {
    var __args = arguments;
    if (__args.length === 2 && typeof __args[0] ==='number' && typeof __args[1] === 'function') {
      j_counter["addAndGet(long,io.vertx.core.Handler)"](__args[0], function(ar) {
        if (ar.succeeded()) {
          __args[1](utils.convReturnLong(ar.result()), null);
        } else {
          __args[1](null, ar.cause());
        }
      });
    } else if (typeof __super_addAndGet != 'undefined') {
      return __super_addAndGet.apply(this, __args);
    }
    else throw new TypeError('function invoked with invalid arguments');
  };

  /**
   Add the value to the counter atomically and return the value before the add

   @public
   @param value {number} the value to add 
   @param resultHandler {function} handler which will be passed the value 
   */
  this.getAndAdd =  function(value, resultHandler) {
    var __args = arguments;
    if (__args.length === 2 && typeof __args[0] ==='number' && typeof __args[1] === 'function') {
      j_counter["getAndAdd(long,io.vertx.core.Handler)"](__args[0], function(ar) {
        if (ar.succeeded()) {
          __args[1](utils.convReturnLong(ar.result()), null);
        } else {
          __args[1](null, ar.cause());
        }
      });
    } else if (typeof __super_getAndAdd != 'undefined') {
      return __super_getAndAdd.apply(this, __args);
    }
    else throw new TypeError('function invoked with invalid arguments');
  };

  /**
   Set the counter to the specified value only if the current value is the expectec value. This happens
   atomically.

   @public
   @param expected {number} the expected value 
   @param value {number} the new value 
   @param resultHandler {function} the handler will be passed true on success 
   */
  this.compareAndSet =  function(expected, value, resultHandler) {
    var __args = arguments;
    if (__args.length === 3 && typeof __args[0] ==='number' && typeof __args[1] ==='number' && typeof __args[2] === 'function') {
      j_counter["compareAndSet(long,long,io.vertx.core.Handler)"](__args[0], __args[1], function(ar) {
        if (ar.succeeded()) {
          __args[2](ar.result(), null);
        } else {
          __args[2](null, ar.cause());
        }
      });
    } else if (typeof __super_compareAndSet != 'undefined') {
      return __super_compareAndSet.apply(this, __args);
    }
    else throw new TypeError('function invoked with invalid arguments');
  };

  // A reference to the underlying Java delegate
  // NOTE! This is an internal API and must not be used in user code.
  // If you rely on this property your code is likely to break if we change it / remove it without warning.
  this._jdel = j_counter;
};

Counter._jclass = utils.getJavaClass("io.vertx.core.shareddata.Counter");
Counter._jtype = {accept: function(obj) {
    return Counter._jclass.isInstance(obj._jdel);
  },wrap: function(jdel) {
    var obj = Object.create(Counter.prototype, {});
    Counter.apply(obj, arguments);
    return obj;
  },
  unwrap: function(obj) {
    return obj._jdel;
  }
};
Counter._create = function(jdel) {var obj = Object.create(Counter.prototype, {});
  Counter.apply(obj, arguments);
  return obj;
}
module.exports = Counter;