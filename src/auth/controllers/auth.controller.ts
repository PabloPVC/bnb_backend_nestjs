import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import * as fs from 'fs';
import { diskStorage } from 'multer';
import { AuthService } from '../services/auth.service';
import { User } from './../../users/entities/user.entity';
import { CreateUserDto } from '../../users/dto/user.dtos';
import { ReStartPasswordDto } from '../../users/dto/re_start_password';
import { UpdatePasswordDto } from 'src/users/dto/update_password';

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
  @Post('imagenProfile')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const dynamicPath = path.join('./uploads/profile');
          if (!fs.existsSync(dynamicPath)) {
            fs.mkdirSync(dynamicPath, { recursive: true }); // Crea el directorio si no existe
          }
          cb(null, dynamicPath);
        },
        filename: async (req, file, cb) => {
          // Define cómo deseas nombrar los archivos (por ejemplo, usando el nombre original)
          const nombreFile = Date.now() + '.png';
          cb(null, nombreFile);
        },
      }),
    }),
  )
  uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1 * 1024 * 1024 }),
          new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    console.log(file);
    return {
      statusCode: 200,
      data: file.path,
    };
  }

  @Post('resetearPassword-movil')
  reseteoPasswordMovil(@Body() body: ReStartPasswordDto) {
    return this.authService
      .reseteoPasswordMovil(body)
      .then(() => {
        return {
          statusCode: 201,
          data: 'Correo de recuperación enviado',
        };
      })
      .catch((error) => {
        throw new HttpException(
          `Error no se envio el correo: ${error}`,
          HttpStatus.BAD_REQUEST,
        );
      });
  }
  @Post('update-password')
  updatePassword(@Body() body: UpdatePasswordDto) {
    console.log('**update-password**');
    return this.authService
      .reseteoPasswordUser(body)
      .then(() => {
        return {
          statusCode: 200,
          data: 'Cambio de password realizado con exíto',
        };
      })
      .catch((error) => {
        return {
          statusCode: 500,
          data: error,
        };
      });
  }
}
