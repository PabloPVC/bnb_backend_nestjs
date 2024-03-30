import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from '../users/entities/user.entity';
import { House } from '../bnb_air/models/house.entity';
import { LocationOfrece } from '../bnb_air/models/location-ofrece.entity';
import { Valoracion_House } from '../bnb_air/models/valoracion_house.entity';
import { Valoracion } from '../bnb_air/models/valoracion.entity';
import { Image } from '../bnb_air/models/images.entity';
import { Profile } from '../users/entities/profile.entity';
import { Menu } from '../users/entities/menu.entity';
import { MenuProfile } from '../users/entities/menu_profile.entity';
import { UsersClaves } from '../users/entities/user_clave.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres', // Cambia al tipo de base de datos que estés utilizando
      host: 'viaduct.proxy.rlwy.net',
      port: 31354,
      username: 'postgres',
      password: 'ujSlWuMemcUTulzDDFzNKSqUQVrbyTKf',
      database: 'my_store',
      entities: ['dist/**/*.entity.js'],
      synchronize: true, // Esto crea automáticamente las tablas en la base de datos
    }),
    TypeOrmModule.forFeature([
      User,
      Profile,
      Menu,
      MenuProfile,
      UsersClaves,
      House,
      Image,
      LocationOfrece,
      Valoracion_House,
      Valoracion,
    ]),
  ],

  exports: [TypeOrmModule], // Exporta el módulo para que otros módulos puedan usarlo
})
export class DatabaseModule {}
