import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from '../users/entities/user.entity';
import { House } from '../bnb_air/models/house.model';
import { LocationOfrece } from '../bnb_air/models/location-ofrece.model';
import { Valoracion_House } from '../bnb_air/models/valoracion_house.model';
import { Valoracion } from '../bnb_air/models/valoracion.model';
import { Image } from '../bnb_air/models/images.model';

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
      synchronize: true, // Esto crea automáticamente las tablas en la base de datos
    }),
    TypeOrmModule.forFeature([
      User,
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
