import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as cookieParser from 'cookie-parser'
import { join } from 'path';
import { ServeStaticModule} from '@nestjs/serve-static'
import * as express from 'express';

const fs = require('fs');
async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule, { cors: true });

  await app.listen(3000);
  app.enableCors({
    origin: ['http://localhost:4200', 'http://localhost:63786'],
    credentials:  true,
    methods: 'GET,PUT,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept',
    
  });
  app.use(cookieParser());
  const expressApp = express();


  // Définir le dossier "uploads" comme dossier contenant des ressources statiques
  // app.use('/uploads', express.static('uploads'));
  // expressApp.use('/uploads', express.static('uploads'));
  // app.use(expressApp);
  // const folderPath = 'C:/Users/ALA AISSA/Desktop/PI-HR/HR_Managment_application_Backend-/uploads';
  // fs.chmodSync(folderPath, 0o777);
  
}


bootstrap();
