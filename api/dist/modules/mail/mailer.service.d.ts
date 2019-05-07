import { ConfigService } from 'nestjs-config';
export declare class MailerService {
    private mailer;
    private defaultContext;
    private transport;
    constructor(config: ConfigService);
    send(template: string, to: string, context: {
        [key: string]: any;
    }): Promise<void>;
    sendHTML(html: string, to: string, subject: string): Promise<void>;
}
