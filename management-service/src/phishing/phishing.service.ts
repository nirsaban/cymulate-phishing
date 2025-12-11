import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PhishingAttempt, PhishingAttemptDocument } from '../schemas/phishing-attempt.schema';
import { Model } from 'mongoose';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { randomBytes } from 'crypto';

@Injectable()
export class PhishingService {
  constructor(
    @InjectModel(PhishingAttempt.name)
    private attemptModel: Model<PhishingAttemptDocument>,
    private http: HttpService,
    
  ) {}

  async listAttempts() {
    return this.attemptModel.find().sort({ createdAt: -1 });
  }

  async createAttempt(email: string, message: string) {
    const token = randomBytes(16).toString('hex');

    const attempt = await this.attemptModel.create({
      email,
      message,
      token,
      status: 'PENDING',
    });

    return attempt;
  }

  async sendAttempt(attemptId: string) {
    try{

   
    const attempt = await this.attemptModel.findById(attemptId);
    if (!attempt) throw new Error('Attempt not found');

    // Call simulation-service
    const response = await firstValueFrom(
      this.http.post(`http://simulation-service:3002/phishing/send`, {
        email: attempt.email,
        message: attempt.message,
        token: attempt.token,
      }),
    );

    if (response.data.success) {
      attempt.status = 'SENT';
      await attempt.save();
    }

    return attempt;
     }catch(err){
        console.log(err.message , err)
    }
  }
  
}
