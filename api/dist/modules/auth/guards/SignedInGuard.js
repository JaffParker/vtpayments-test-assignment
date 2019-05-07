"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const apollo_server_core_1 = require("apollo-server-core");
const ServerErrors_1 = require("../../../types/Errors/ServerErrors");
let SignedInGuard = class SignedInGuard {
    canActivate(context) {
        const isSignedIn = graphql_1.GqlExecutionContext.create(context).getContext().isSignedIn;
        if (isSignedIn) {
            return true;
        }
        throw new apollo_server_core_1.ForbiddenError(ServerErrors_1.ServerErrors.MustSignIn);
    }
};
SignedInGuard = __decorate([
    common_1.Injectable()
], SignedInGuard);
exports.SignedInGuard = SignedInGuard;
//# sourceMappingURL=SignedInGuard.js.map