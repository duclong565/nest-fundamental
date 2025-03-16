import { Injectable, OnModuleInit } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
@Injectable()
export class MailService implements OnModuleInit {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.NODEMAILER_SERVER_EMAIL,
        pass: process.env.NODEMAILER_APPLICATION_PASSWORD,
      },
    });

    this.transporter.verify((error, success) => {
      if (error) {
        console.error('Error connecting to SMTP server:', error);
      } else {
        console.log('SMTP server is ready to send emails', success);
      }
    });
  }

  async onModuleInit() {
    // You can perform any initialization logic here if needed
    // await this.testEmail();
  }

  async sendEmail(to: string, subject: string, html: string): Promise<void> {
    try {
      const result = await this.transporter.sendMail({
        from: process.env.NODEMAILER_SERVER_EMAIL,
        to,
        subject,
        html,
      });

      console.log('Email sent successfully:', result);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }

  // A proper test method that can be called when needed
  async testEmail(): Promise<void> {
    try {
      await this.sendEmail(
        'nguyenduclong5a1@gmail.com',
        'Test Email',
        '<h1>Test</h1><p>This is a test email from your NestJS application</p>',
      );
      console.log('Test email sent successfully');
    } catch (error) {
      console.error('Error sending test email:', error);
    }
  }
}
