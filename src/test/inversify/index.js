"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
require("reflect-metadata");
var inversify_1 = require("inversify");
var container = new inversify_1.Container();
var A = /** @class */ (function () {
    function A() {
    }
    A.prototype.getName = function () {
        return 'A';
    };
    A = __decorate([
        inversify_1.injectable()
    ], A);
    return A;
}());
container.bind('request1').to(A);
var B = /** @class */ (function () {
    function B() {
    }
    B.prototype.getName = function () {
        return 'B';
    };
    B = __decorate([
        inversify_1.injectable()
    ], B);
    return B;
}());
container.bind('request2').to(B);
var AB = /** @class */ (function () {
    function AB(a, b) {
        this.pm = a;
        this.cm = b;
    }
    AB.prototype.getName = function () {
        var result = this.pm.getName() + this.cm.getName();
        return result;
    };
    AB = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject('request1')),
        __param(1, inversify_1.inject('request2'))
    ], AB);
    return AB;
}());
container.bind('Plan').to(AB);
var ab = container.get('Plan');
console.log(ab.getName()); // AB
