"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    synchronize: process.env.DB_SYNCHRONIZE === 'true',
};
//# sourceMappingURL=db.js.map