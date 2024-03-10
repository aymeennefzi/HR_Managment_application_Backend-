import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { AuthModule } from './auth/auth.module';
import {CongesModule} from "./conges/conges.module";
import { DepartementsModule } from './departements/departements.module';
import { EntreprisesModule } from './entreprises/entreprises.module';
import { ProjectModule } from './project/project.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    BookModule,
    AuthModule,
      CongesModule,
      DepartementsModule,
      EntreprisesModule,
      ProjectModule,
    
      

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
