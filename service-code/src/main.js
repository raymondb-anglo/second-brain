"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = require("./api/server");
var PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000;
server_1.default.listen(PORT, function () { return console.log("Second\u2011Brain listening on ".concat(PORT)); });
