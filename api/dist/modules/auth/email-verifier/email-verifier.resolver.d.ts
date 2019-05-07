import { EmailVerifierService } from './email-verifier.service';
import { EmailConfirmation } from '../../../types/Api';
export declare class EmailVerifierResolver {
    private emailVerifier;
    constructor(emailVerifier: EmailVerifierService);
    confirmEmail(token: string): Promise<EmailConfirmation>;
    resendConfirmationEmail(userId: string): Promise<void>;
}
