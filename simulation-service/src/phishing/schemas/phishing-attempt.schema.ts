import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PhishingAttemptDocument = PhishingAttempt & Document;

@Schema({ timestamps: true })
export class PhishingAttempt {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  message: string;

  @Prop({ required: true, enum: ['PENDING', 'SENT', 'CLICKED'], default: 'PENDING' })
  status: string;

  @Prop()
  token: string;
}

export const PhishingAttemptSchema = SchemaFactory.createForClass(PhishingAttempt);
