import { AuthService } from './auth.service';
import { SignInInput, Auth } from '../../types/Api';
export declare class AuthResolver {
    private auth;
    private logger;
    constructor(auth: AuthService);
    signIn({ email, password }: SignInInput): Promise<Auth>;
}
