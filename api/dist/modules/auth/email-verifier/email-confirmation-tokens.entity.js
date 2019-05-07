"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
let EmailConfirmationToken = class EmailConfirmationToken {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", String)
], EmailConfirmationToken.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], EmailConfirmationToken.prototype, "userId", void 0);
__decorate([
    typeorm_1.Generated('uuid'),
    typeorm_1.Column(),
    __metadata("design:type", String)
], EmailConfirmationToken.prototype, "token", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], EmailConfirmationToken.prototype, "email", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], EmailConfirmationToken.prototype, "createdAt", void 0);
EmailConfirmationToken = __decorate([
    typeorm_1.Entity('emailConfirmationTokens')
], EmailConfirmationToken);
exports.EmailConfirmationToken = EmailConfirmationToken;
//# sourceMappingURL=email-confirmation-tokens.entity.js.map