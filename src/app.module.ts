import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import {CongesModule} from "./conges/conges.module";
import { DepartementsModule } from './departements/departements.module';
import { EntreprisesModule } from './entreprises/entreprises.module';
import { ProjectModule } from './project/project.module';
import {AttendanceModule} from "./attendance/attendance.module";
import { HolidaysModule } from './holidays/holidays.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    AuthModule,
      CongesModule,
      DepartementsModule,
      EntreprisesModule,
      ProjectModule,
      AttendanceModule,
      HolidaysModule
    
      

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
