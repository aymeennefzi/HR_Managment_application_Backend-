import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectModule } from './project/project.module';

@Module({
  imports:[ MongooseModule.forRoot('mongodb://127.0.0.1/HRmanagment'),ProjectModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
