import { Module } from '@nestjs/common';
import { PhishingService } from './phishing.service';
import { PhishingController } from './phishing.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PhishingAttempt, PhishingAttemptSchema } from '../schemas/phishing-attempt.schema';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: PhishingAttempt.name, schema: PhishingAttemptSchema }]),
    HttpModule, // Needed to call simulation-service
  ],
  providers: [PhishingService],
  controllers: [PhishingController],
})
export class PhishingModule {}
