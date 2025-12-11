import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PhishingAttempt, PhishingAttemptDocument } from './schemas/phishing-attempt.schema';
import { Model } from 'mongoose';
import * as nodemailer from 'nodemailer';

@Injectable()
export class PhishingService {
  constructor(
    @InjectModel(PhishingAttempt.name)
    private attemptModel: Model<PhishingAttemptDocument>,
  ) {}

  async sendEmail(email: string, message: string, token: string) {

    const clickUrl = `http://localhost:3002/phishing/click/${token}`;
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,     // add to .env
        pass: process.env.EMAIL_PASS,     // add to .env
      },
    });

    await transporter.sendMail({
      from: '"Phishing Test" <no-reply@phishing.com>',
      to: email,
      subject: 'Security Awareness Test',
      html: `
        <h2>This is a phishing simulation</h2>
        <p>${message}</p>
        <a href="${clickUrl}">Click here to continue</a>
      `,
    });

    // update status to SENT
    await this.attemptModel.findOneAndUpdate({ token }, { status: 'SENT' });

    return { success: true, clickUrl };
  }

  async handleClick(token: string) {
    const attempt = await this.attemptModel.findOne({ token });

    if (!attempt) {
      return { success: false, message: 'Invalid token' };
    }

    attempt.status = 'CLICKED';
    await attempt.save();

    return { success: true, message: "Phishing link clicked!" };
  }
}
