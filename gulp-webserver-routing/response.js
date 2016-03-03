"use strict";
var http = require("http");
var Response = (function () {
    /**
     *
     */
    function Response() {
        this.__proto__ = http.ServerResponse.prototype;
    }
    return Response;
}());
module.exports = Response;
//# sourceMappingURL=response.js.map