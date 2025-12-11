import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { PhishingModule } from './phishing/phishing.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    // 👇 BEST PRACTICE — async + ConfigService ensures type safety
    MongooseModule.forRootAsync({
      imports: [ConfigModule,AuthModule],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('MONGO_URI')!, // the ! tells TS: "I guarantee it's a string"
      }),
      inject: [ConfigService],
    }),

    AuthModule,

    PhishingModule,
  ],
})
export class AppModule {}
