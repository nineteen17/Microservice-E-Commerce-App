"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var app_1 = __importDefault(require("./app"));
var db_1 = __importDefault(require("./db"));
dotenv_1.default.config();
(0, db_1.default)();
var PORT = 4000;
app_1.default.listen(PORT, function () {
    console.log("server started on port ".concat(PORT));
});
