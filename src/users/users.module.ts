import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './entities/user.entity';
import { OrdesService } from './services/ordes.service';
import { Order } from './entities/order.entity';
import { Customer } from './entities/customer.entity';
import { Profile } from './entities/profile.entity';
import { OrderDetalle } from './entities/order_detalle.entity';
import { Menu } from './entities/menu.entity';
import { MenuProfile } from './entities/menu_profile.entity';
import { UsersClaves } from './entities/user_clave.entity';

import { OrdesController } from './controllers/ordes.controller';
import { UsersController } from './controllers/users.controller';
import { CustomersController } from './controllers/customers.controller';
import { ProfileController } from './controllers/profile.controller';
import { MenuController } from './controllers/menu.controller';
import { ResetPasswordController } from './controllers/reset-password.controller';
import { CustomersService } from './services/customers.service';
import { ProfileService } from './services/profile.service';
import { MenuService } from './services/menu.service';
import { EmailsendService } from './services/emails/emailsend.service';
import { UsersService } from './services/users.service';
import config from '../config';
import { ConfigType } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        return {
          secret: configService.jwtSecret,
          signOptions: {
            expiresIn: '5m',
          },
        };
      },
    }),
    TypeOrmModule.forFeature([
      User,
      Order,
      Customer,
      Profile,
      OrderDetalle,
      Menu,
      MenuProfile,
      UsersClaves,
    ]),
  ],
  controllers: [
    OrdesController,
    UsersController,
    CustomersController,
    ProfileController,
    MenuController,
    ResetPasswordController,
  ],
  providers: [
    OrdesService,
    CustomersService,
    ProfileService,
    MenuService,
    EmailsendService,
    UsersService,
  ],
  exports: [UsersService],
})
export class UsersModule {}
