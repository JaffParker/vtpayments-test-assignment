declare const _default: {
    templateRoot: string;
    transport: {
        host: string;
        port: number;
        secure: boolean;
        auth: {
            user: string;
            pass: string;
        };
        tls: {
            ciphers: string;
        };
    };
    sender: string;
    getDefaultContext(): {
        baseUrl: any;
    };
};
export default _default;
