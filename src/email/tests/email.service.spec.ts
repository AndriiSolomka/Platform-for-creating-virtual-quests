/* eslint-disable */
import { EmailService } from '../email.service';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { EMAIL } from '../../constants/enum/email/email.enum';

jest.mock('nodemailer');

describe('EmailService', () => {
  let emailService: EmailService;
  let configService: jest.Mocked<ConfigService>;
  let sendMailMock: jest.Mock;

  beforeEach(() => {
    configService = {
      getOrThrow: jest.fn(),
    } as any;

    configService.getOrThrow.mockImplementation((key: string) => {
      if (key === 'EMAIL_USER') return 'testuser@mail.com';
      if (key === 'EMAIL_PASSWORD') return 'testpass';
    });

    sendMailMock = jest.fn().mockResolvedValue(undefined);

    (nodemailer.createTransport as jest.Mock).mockReturnValue({
      sendMail: sendMailMock,
    });

    emailService = new EmailService(configService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize transporter with correct config', () => {
    expect(nodemailer.createTransport).toHaveBeenCalledWith({
      service: EMAIL.SERVICE,
      auth: {
        user: 'testuser@mail.com',
        pass: 'testpass',
      },
    });
  });

  it('should send confirmation email with correct payload', async () => {
    const email = 'recipient@mail.com';
    const token = 'sometoken';

    await emailService.sendConfirmationEmail(email, token);

    expect(sendMailMock).toHaveBeenCalledWith({
      from: 'testuser@mail.com',
      to: email,
      subject: EMAIL.SUBJECT,
      text: `${EMAIL.TEXT} ${EMAIL.CONFIRM_LINK}${token}`,
    });
  });

  it('should call sendMail with correct mailOptions in sendEmail', async () => {
    const payload = {
      email: 'foo@bar.com',
      subject: 'Test Subject',
      text: 'Test Body',
    };

    await emailService['sendEmail'](payload);

    expect(sendMailMock).toHaveBeenCalledWith({
      from: 'testuser@mail.com',
      to: payload.email,
      subject: payload.subject,
      text: payload.text,
    });
  });
});
