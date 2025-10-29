"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CounterService = void 0;
const common_1 = require("@nestjs/common");
let CounterService = class CounterService {
    counts = [];
    getState() {
        const current = this.counts.length > 0 ? this.counts[this.counts.length - 1] : 0;
        return {
            current,
            history: [...this.counts],
        };
    }
    increment() {
        const next = (this.counts.length > 0 ? this.counts[this.counts.length - 1] : 0) + 1;
        this.counts.push(next);
        return this.getState();
    }
};
exports.CounterService = CounterService;
exports.CounterService = CounterService = __decorate([
    (0, common_1.Injectable)()
], CounterService);
//# sourceMappingURL=counter.service.js.map