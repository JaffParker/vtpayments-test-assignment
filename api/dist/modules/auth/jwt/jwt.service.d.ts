import { ConfigService } from 'nestjs-config';
interface TokenPayload {
    sub: string;
}
export declare class JwtService {
    private config;
    constructor(config: ConfigService);
    createToken(userId: string): Promise<string>;
    parseToken(token: string): Promise<TokenPayload>;
}
export {};
