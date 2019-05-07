import { UsersService } from '../users/users.service';
import { JwtService } from './jwt/jwt.service';
import { PasswordService } from './password/password.service';
import { User } from '../users/users.entity';
export declare class AuthService {
    private users;
    private jwt;
    private password;
    constructor(users: UsersService, jwt: JwtService, password: PasswordService);
    getUser(email: string, password: string): Promise<User>;
    getTokenForUser(user: User): Promise<string>;
    getUserByToken(token: string): Promise<User>;
}
