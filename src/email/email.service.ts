import * as nodemailer from 'nodemailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EMAIL } from 'src/constants/enum/email/email.enum';
import { IEmailPayload } from 'src/constants/interfaces/email/email.interface';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;
  private readonly emailUser: string;
  private readonly emailPass: string;

  constructor(private readonly config: ConfigService) {
    this.emailUser = this.config.getOrThrow<string>('EMAIL_USER');
    this.emailPass = this.config.getOrThrow<string>('EMAIL_PASSWORD');

    this.transporter = nodemailer.createTransport({
      service: EMAIL.SERVICE,
      auth: {
        user: this.emailUser,
        pass: this.emailPass,
      },
    });
  }

  private async sendEmail(emailPayload: IEmailPayload): Promise<void> {
    const mailOptions = {
      from: this.emailUser,
      to: emailPayload.email,
      subject: emailPayload.subject,
      text: emailPayload.text,
    };
    await this.transporter.sendMail(mailOptions);
  }

  async sendConfirmationEmail(email: string, token: string): Promise<void> {
    const confirmationUrl = `${EMAIL.CONFIRM_LINK}${token}`;
    const subject = EMAIL.SUBJECT;
    const text = `${EMAIL.TEXT} ${confirmationUrl}`;
    await this.sendEmail({ email, subject, text });
  }
}
