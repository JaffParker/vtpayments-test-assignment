export declare class PasswordService {
    hash(password: string): Promise<string>;
    compare(hash: string, input: string): Promise<boolean>;
}
