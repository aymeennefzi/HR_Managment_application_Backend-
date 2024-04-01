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
import { JobModule } from './jobs/job/job.module';
import { ApplicationModule } from './jobs/application/application.module';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfigModule } from './multer-config/multer-config.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { SkillModule } from './jobs/skill/skill.module';

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
      JobModule,
      ApplicationModule,
      MulterModule.register({
        dest: './uploads', // Répertoire de destination pour stocker les fichiers téléchargés
      }),
      MulterConfigModule,
      ServeStaticModule.forRoot({
        // Spécifiez le chemin du dossier contenant les fichiers statiques (dans ce cas, le dossier 'uploads')
        rootPath: join(__dirname, '..', 'uploads'), // chemin absolu vers le dossier 'uploads'
      }),
      SkillModule
    
      

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
