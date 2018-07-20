'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function isPromise(obj) {
	return obj instanceof Promise || obj.then;
}
function isDefined(obj) {
	return typeof obj !== 'undefined';
}
var PENDING = 0;
var RESOLVE = 1;
var REJECT = 2;

var Promise = function () {
	_createClass(Promise, null, [{
		key: 'resolve',
		value: function resolve(d) {
			return new Promise(function (r) {
				return r(d);
			});
		}
	}, {
		key: 'reject',
		value: function reject(d) {
			return new Promise(function (r, r2) {
				return r2(d);
			});
		}
	}]);

	function Promise(executor) {
		var _this = this;

		_classCallCheck(this, Promise);

		this._status = PENDING;
		this._value = undefined;
		this._cb = [];

		var resolve = function resolve(data) {
			_this._setState(RESOLVE, data);
		};
		var reject = function reject(data) {
			_this._setState(REJECT, data);
		};

		executor(resolve, reject);
	}

	_createClass(Promise, [{
		key: '_wrapThenCb',
		value: function _wrapThenCb(onFulfilled, onRejected) {
			var _this2 = this;

			var getRet = function getRet() {
				if (_this2._getState() === RESOLVE && onFulfilled) {
					return onFulfilled(_this2._value);
				} else if (_this2._getState() === REJECT && onRejected) {
					return onRejected(_this2._value);
				}
			};
			var normalize = function normalize(ret) {
				if (!isDefined(ret) || !isPromise(ret)) {
					return Promise.resolve(ret);
				}

				return ret;
			};

			return normalize(getRet());
		}
	}, {
		key: 'then',
		value: function then(onFulfilled, onRejected) {
			var _this3 = this;

			var resolve = void 0,
				reject = void 0;
			var p = new Promise(function (r1, r2) {
				resolve = r1;
				reject = r2;
			});

			this._addCb(function () {
				var ret = _this3._wrapThenCb(onFulfilled, onRejected);

				ret._addCb(function () {
					if (ret._getState() === RESOLVE) resolve(ret._value);
					if (ret._getState() === REJECT) reject(ret._value);
				});
			});

			return p;
		}
	}, {
		key: '_setState',
		value: function _setState(state, result) {
			if (this._getState() === PENDING) {
				this._status = state;
				this._value = result;
				this._execCb();
			}
		}
	}, {
		key: '_getState',
		value: function _getState() {
			return this._status;
		}
	}, {
		key: '_addCb',
		value: function _addCb(cb) {
			this._cb.push(cb);
			this._execCb();
		}
	}, {
		key: '_execCb',
		value: function _execCb() {
			if (this._timer) {
				clearTimeout(this._timer);
			}
			if (this._getState() !== PENDING) {
				this._timer = setTimeout(this._callback.bind(this), 0);
			}
		}
	}, {
		key: '_callback',
		value: function _callback() {
			var cbs = this._cb;

			this._cb = [];
			this._timer = null;

			cbs.forEach(function (cb) {
				cb();
			});
		}
	}]);

	return Promise;
}();

exports.default = Promise;