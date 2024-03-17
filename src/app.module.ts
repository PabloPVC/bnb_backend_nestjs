import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './user.models';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'viaduct.proxy.rlwy.net',
      port: 31354,
      username: 'postgres',
      password: 'ujSlWuMemcUTulzDDFzNKSqUQVrbyTKf',
      database: 'my_store',
      entities: [User],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
