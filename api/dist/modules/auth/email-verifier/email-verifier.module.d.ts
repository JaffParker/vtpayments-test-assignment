import { OnModuleInit } from '@nestjs/common';
import { EmailVerifierService } from './email-verifier.service';
import { EventEmitter } from '../../events/event-emitter';
import { User } from '../../users/users.entity';
export declare class EmailVerifierModule implements OnModuleInit {
    private events;
    private tokens;
    constructor(events: EventEmitter, tokens: EmailVerifierService);
    onModuleInit(): void;
    createTokenForUser(user: User): Promise<void>;
}
