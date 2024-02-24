import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {DevtoolsModule} from "@nestjs/devtools-integration";
import * as process from "process";
import {MongooseModule} from "@nestjs/mongoose";

@Module({
  imports: [
      DevtoolsModule.register({
        http : process.env.NODE_ENV !=='production' ,
      }), MongooseModule.forRoot('mongodb://127.0.0.1/HRmanagment')
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
