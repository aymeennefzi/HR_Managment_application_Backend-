import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {DevtoolsModule} from "@nestjs/devtools-integration";
import * as process from "process";

@Module({
  imports: [
      DevtoolsModule.register({
        http : process.env.NODE_ENV !=='production' ,
      })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
