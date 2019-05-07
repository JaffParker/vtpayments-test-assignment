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
const Email = require("email-templates");
const nestjs_config_1 = require("nestjs-config");
const nodemailer_1 = require("nodemailer");
let MailerService = class MailerService {
    constructor(config) {
        const emailConfig = config.get('email');
        this.defaultContext = emailConfig.getDefaultContext();
        this.transport = nodemailer_1.createTransport(emailConfig.transport);
        this.mailer = new Email({
            views: {
                root: emailConfig.templateRoot,
                options: {
                    extension: 'ejs',
                },
            },
            message: {
                from: emailConfig.sender,
            },
            send: config.get('app').isProduction(),
            preview: !config.get('app').isProduction(),
            transport: this.transport,
        });
    }
    send(template, to, context) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.mailer.send({
                template,
                message: {
                    to,
                },
                locals: Object.assign({}, this.defaultContext, context),
            });
        });
    }
    sendHTML(html, to, subject) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.transport.sendMail({ to, html, subject });
        });
    }
};
MailerService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [nestjs_config_1.ConfigService])
], MailerService);
exports.MailerService = MailerService;
//# sourceMappingURL=mailer.service.js.map