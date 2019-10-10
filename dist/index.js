"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var genericPool = require("generic-pool");
var NumberClient_1 = require("./NumberClient");
var FetchPool = /** @class */ (function () {
    function FetchPool() {
        var _this = this;
        this.opts = {
            max: 8,
            min: 2,
        };
        this.count = 0;
        this.factory = {
            create: function () {
                _this.count++;
                return Promise.resolve(new NumberClient_1.default(_this.count));
            },
            destroy: function (client) {
                _this.count--;
                return Promise.resolve();
            },
        };
        this.pool = genericPool.createPool(this.factory, this.opts);
    }
    FetchPool.prototype.fetch = function (url, init) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            return _this.pool.acquire().then(function (c) {
                return fetch(url(c.number), init)
                    .catch(function (err) {
                    _this.pool.release(c);
                    return reject(err);
                })
                    .then(function (response) {
                    _this.pool.release(c);
                    return resolve(response);
                });
            });
        });
    };
    return FetchPool;
}());
exports.default = FetchPool;
//# sourceMappingURL=index.js.map