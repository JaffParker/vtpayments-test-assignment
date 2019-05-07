import { Injectable } from '@nestjs/common'
import * as Email from 'email-templates'
import { ConfigService } from 'nestjs-config'
import { createTransport } from 'nodemailer'

@Injectable()
export class MailerService {
  private mailer: Email
  private defaultContext: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any
  }
  private transport: ReturnType<typeof createTransport>

  constructor(config: ConfigService) {
    const emailConfig = config.get('email')

    this.defaultContext = emailConfig.getDefaultContext()
    this.transport = createTransport(emailConfig.transport)
    this.mailer = new Email({
      views: {
        root: emailConfig.templateRoot,
        options: {
          extension: 'ejs',
        },
      },
      message: {
        from: emailConfig.sender,
      },
      send: config.get('app').isProduction(),
      preview: !config.get('app').isProduction(),
      transport: this.transport,
    })
  }

  async send(
    template: string,
    to: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    context: { [key: string]: any },
  ): Promise<void> {
    await this.mailer.send({
      template,
      message: {
        to,
      },
      locals: {
        ...this.defaultContext,
        ...context,
      },
    })
  }

  async sendHTML(html: string, to: string, subject: string): Promise<void> {
    await this.transport.sendMail({ to, html, subject })
  }
}
