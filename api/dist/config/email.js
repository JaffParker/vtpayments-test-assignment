"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
exports.default = {
    templateRoot: path.resolve(__dirname, '../../emailTemplates'),
    transport: {
        host: 'smtp-relay.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
        tls: {
            ciphers: 'SSLv3',
        },
    },
    sender: 'VTPayments Virtual Terminal <requests@vtpayments.com>',
    getDefaultContext() {
        return { baseUrl: this.get('app.url') };
    },
};
//# sourceMappingURL=email.js.map