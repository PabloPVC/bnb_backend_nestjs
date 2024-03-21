import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('')
  getAll() {
    return {
      version: 1.0,
      mensaje: 'app-bnb-postgres',
    };
  }
}
