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
    delete user.password;
    return this.authService.generateJWT(user);
  }

  @Post('create_user')
  async create_user(@Body() payload: CreateUserDto) {
    const userCreate = await this.authService.createUser(payload);
    delete userCreate.password;
    return {
      access_token: this.authService.crearJWT(userCreate),
      user: userCreate,
    };
  }
}
