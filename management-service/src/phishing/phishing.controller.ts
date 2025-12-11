import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { PhishingService } from './phishing.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('phishing')
@UseGuards(AuthGuard('jwt'))
export class PhishingController {
  constructor(private phishingService: PhishingService) {}

  @Get()
  list() {
    return this.phishingService.listAttempts();
  }

  @Post('create')
  create(@Body() body: { email: string; message: string }) {
    return this.phishingService.createAttempt(body.email, body.message);
  }

  @Post('send/:id')
  send(@Param('id') id: string) {
    return this.phishingService.sendAttempt(id);
  }
}
