import { EmailConfirmationToken } from './email-confirmation-tokens.entity';
import { Repository } from 'typeorm';
import { MailerService } from '../../mail/mailer.service';
import { User } from '../../users/users.entity';
import { EventEmitter } from '../../events/event-emitter';
import { UsersService } from '../../users/users.service';
export declare class EmailVerifierService {
    private tokensRepo;
    private users;
    private mailer;
    private events;
    constructor(tokensRepo: Repository<EmailConfirmationToken>, users: UsersService, mailer: MailerService, events: EventEmitter);
    createToken(user: User): Promise<void>;
    resendEmailForUser(userId: string): Promise<void>;
    emailToken(user: User, { token }: EmailConfirmationToken): Promise<void>;
    verifyByToken(token: string): Promise<EmailConfirmationToken>;
    deleteToken(token: string): Promise<void>;
    deleteByUserId(userId: string): Promise<void>;
}
