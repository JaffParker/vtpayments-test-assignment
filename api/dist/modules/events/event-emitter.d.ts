import { Event } from './event';
export declare class EventEmitter {
    private nodeEvents;
    constructor();
    emit<T extends Event>(event: T, payload: T['payload']): void;
    on<T extends Event>(event: T, callback: (payload: T['payload']) => void): void;
}
