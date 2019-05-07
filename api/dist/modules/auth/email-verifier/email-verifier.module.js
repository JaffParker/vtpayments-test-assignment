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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const email_confirmation_tokens_entity_1 = require("./email-confirmation-tokens.entity");
const email_verifier_service_1 = require("./email-verifier.service");
const email_verifier_resolver_1 = require("./email-verifier.resolver");
const event_emitter_1 = require("../../events/event-emitter");
const users_events_1 = require("../../users/users.events");
const users_module_1 = require("../../users/users.module");
let EmailVerifierModule = class EmailVerifierModule {
    constructor(events, tokens) {
        this.events = events;
        this.tokens = tokens;
    }
    onModuleInit() {
        this.events.on(new users_events_1.UserCreated(), this.createTokenForUser.bind(this));
    }
    createTokenForUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            this.tokens.createToken(user);
        });
    }
};
EmailVerifierModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([email_confirmation_tokens_entity_1.EmailConfirmationToken]), users_module_1.UsersModule],
        providers: [email_verifier_service_1.EmailVerifierService, email_verifier_resolver_1.EmailVerifierResolver],
    }),
    __metadata("design:paramtypes", [event_emitter_1.EventEmitter,
        email_verifier_service_1.EmailVerifierService])
], EmailVerifierModule);
exports.EmailVerifierModule = EmailVerifierModule;
//# sourceMappingURL=email-verifier.module.js.map