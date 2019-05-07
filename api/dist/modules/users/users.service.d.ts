import { Repository } from 'typeorm';
import { User } from './users.entity';
import { EventEmitter } from '../events/event-emitter';
declare type CreateUserInput = Pick<User, 'email' | 'profile'>;
export declare class UsersService {
    private userRepo;
    private events;
    constructor(userRepo: Repository<User>, events: EventEmitter);
    getAll(): Promise<User[]>;
    getById(id: string): Promise<User>;
    getByEmail(email: string): Promise<User>;
    userExists(params: Partial<User>): Promise<boolean>;
    create(input: CreateUserInput): Promise<User>;
    update(id: string, input: Partial<User>): Promise<User>;
}
export {};
