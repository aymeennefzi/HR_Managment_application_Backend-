import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectModule } from './project/project.module';
import { NotificationModule } from './notification/notification.module';
import { AuthModule } from './user/auth.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports:[ ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true,
  }), MongooseModule.forRoot('mongodb://127.0.0.1/HRmanagment'),ProjectModule, NotificationModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
