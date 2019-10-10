"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var genericPool = require("generic-pool");
var NumberClient = /** @class */ (function () {
    function NumberClient(n) {
        this.number = 0;
        this.number = n;
    }
    return NumberClient;
}());
;
var fetchPool = /** @class */ (function () {
    function fetchPool() {
        var _this = this;
        this.opts = {
            max: 8,
            min: 2
        };
        this.count = 0;
        this.factory = {
            create: function () {
                _this.count++;
                return Promise.resolve(new NumberClient(_this.count));
            },
            destroy: function (client) {
                _this.count--;
                return Promise.resolve();
            }
        };
        this.pool = genericPool.createPool(this.factory, this.opts);
    }
    fetchPool.prototype.fetch = function (url, init) {
        var _this = this;
        return this.pool.acquire()
            .then(function (c) {
            return fetch(url(c.number), init)
                .catch(function (err) {
                _this.pool.release(c);
                return err;
            })
                .then(function (response) {
                _this.pool.release(c);
                return response;
            });
        });
    };
    return fetchPool;
}());
exports.fetchPool = fetchPool;
//# sourceMappingURL=index.js.map