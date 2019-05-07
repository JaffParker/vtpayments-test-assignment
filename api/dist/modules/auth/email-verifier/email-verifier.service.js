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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
const typeorm_2 = require("typeorm");
const mailer_service_1 = require("../../mail/mailer.service");
const AuthErrors_1 = require("../../../types/Errors/AuthErrors");
const InputError_1 = require("../../../errors/InputError");
const event_emitter_1 = require("../../events/event-emitter");
const email_verifier_events_1 = require("./email-verifier.events");
const users_service_1 = require("../../users/users.service");
let EmailVerifierService = class EmailVerifierService {
    constructor(tokensRepo, users, mailer, events) {
        this.tokensRepo = tokensRepo;
        this.users = users;
        this.mailer = mailer;
        this.events = events;
    }
    createToken(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenEntity = yield this.tokensRepo.save(this.tokensRepo.create({
                userId: user.id,
                email: user.email,
            }));
            yield this.emailToken(user, tokenEntity);
        });
    }
    resendEmailForUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenEntity = yield this.tokensRepo.findOne({ userId });
            const user = yield this.users.getById(userId);
            yield this.emailToken(user, tokenEntity);
        });
    }
    emailToken(user, { token }) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.mailer.send('emailConfirmation', user.email, {
                user,
                token,
            });
        });
    }
    verifyByToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenEntity = yield this.tokensRepo.findOne({ token });
            if (tokenEntity) {
                yield this.deleteToken(token);
                this.events.emit(new email_verifier_events_1.EmailConfirmed(), tokenEntity.userId);
                return tokenEntity;
            }
            throw new InputError_1.InputError(AuthErrors_1.AuthErrors.EmailTokenNotFound);
        });
    }
    deleteToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.tokensRepo.delete({ token });
        });
    }
    deleteByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.tokensRepo.delete({ userId });
        });
    }
};
EmailVerifierService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(email_confirmation_tokens_entity_1.EmailConfirmationToken)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService,
        mailer_service_1.MailerService,
        event_emitter_1.EventEmitter])
], EmailVerifierService);
exports.EmailVerifierService = EmailVerifierService;
//# sourceMappingURL=email-verifier.service.js.map