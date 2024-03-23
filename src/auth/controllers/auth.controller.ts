import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';
import { User } from './../../users/entities/user.entity';
import { CreateUserDto } from '../../users/dto/user.dtos';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Req() req: Request) {
    const user = req.user as User;
    return this.authService.generateJWT(user);
  }

  @Post('create_user')
  create_user(@Body() payload: CreateUserDto) {
    return this.authService.createUser(payload);
  }
}
