import { Event } from '../events/event';
import { User } from './users.entity';
export declare class UserCreated implements Event {
    payload: User;
}
