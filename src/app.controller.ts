import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './user.models';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('users')
  getAll() {
    return this.appService.getAll();
  }

  @Post()
  createUser(@Body() user: User) {
    return this.appService.create(user);
  }
}
