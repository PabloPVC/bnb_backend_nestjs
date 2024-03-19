import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Profile } from 'src/profile.entity';
import { MenuUsuario } from 'src/menu_usuario.entity';
import { Menu } from '../menu.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // Cambia al tipo de base de datos que estés utilizando
      host: 'viaduct.proxy.rlwy.net',
      port: 31354,
      username: 'postgres',
      password: 'ujSlWuMemcUTulzDDFzNKSqUQVrbyTKf',
      database: 'my_store',
      entities: [User, Profile, Menu, MenuUsuario],
      synchronize: true, // Esto crea automáticamente las tablas en la base de datos
    }),
    TypeOrmModule.forFeature([User]),
  ],

  exports: [TypeOrmModule], // Exporta el módulo para que otros módulos puedan usarlo
})
export class DatabaseModule {}
