import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { PhishingService } from './phishing.service';

@Controller('phishing')
export class PhishingController {
  constructor(private service: PhishingService) {}

  @Post('send')
  send(@Body() body: { email: string; message: string; token: string }) {
    return this.service.sendEmail(body.email, body.message, body.token);
  }

  @Get('click/:token')
  click(@Param('token') token: string) {
    return this.service.handleClick(token);
  }
}
