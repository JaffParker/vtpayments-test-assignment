import { OnModuleInit } from '@nestjs/common';
import { UsersService } from './users.service';
import { EventEmitter } from '../events/event-emitter';
export declare class UsersModule implements OnModuleInit {
    private users;
    private events;
    constructor(users: UsersService, events: EventEmitter);
    onModuleInit(): void;
    private setEmailConfirmedForUser;
}
