import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { User } from '../../users/entities/user.entity';
import { PayloadToken } from '../entities/token.model';
import { UsersService } from '../../users/services/users.service';
import { CreateUserDto } from '../../users/dto/user.dtos';
import { ReStartPasswordDto } from 'src/users/dto/re_start_password';
import { UpdatePasswordDto } from '../../users/dto/update_password';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        return user;
      }
    }
    return null;
  }
  generateJWT(user: User) {
    const payload: PayloadToken = {
      profile: user.profile.nombre,
      sub: user.id,
    };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  crearJWT(user: User) {
    const payload: PayloadToken = {
      profile: user.profile.nombre,
      sub: user.id,
    };
    return this.jwtService.sign(payload);
  }

  createUser(payload: CreateUserDto) {
    return this.usersService.create(payload);
  }

  reseteoPasswordMovil(reStartPassword: ReStartPasswordDto) {
    return this.usersService.reseteoPasswordMovil(reStartPassword);
  }
  reseteoPasswordUser(body: UpdatePasswordDto) {
    return this.usersService.reseteoPasswordUser(body);
  }
}
