"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stream_1 = require("stream");
const MimeNotAllowedError_1 = require("../errors/MimeNotAllowedError");
const vFileType = require("file-type");
exports.MimeChecker = (allowedMime) => {
    const mimeChecker = new stream_1.Transform();
    mimeChecker.data = [];
    mimeChecker.mimeFound = false;
    mimeChecker._transform = function (chunk, encoding, done) {
        const self = this;
        if (self.mimeFound) {
            self.push(chunk);
            return done();
        }
        self.data.push(chunk);
        if (self.data.length < 10) {
            return done();
        }
        else if (self.data.length === 10) {
            const buffered = Buffer.concat(self.data);
            const { mime } = vFileType(buffered);
            if (!allowedMime.includes(mime))
                return self.emit('error', new MimeNotAllowedError_1.MimeNotAllowedError());
            self.data.map(self.push.bind(self));
            console.log(self);
            self.mimeFound = self;
            return done();
        }
    };
    return mimeChecker;
};
//# sourceMappingURL=MimeChecker.js.map