import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { AuthModule } from './auth/auth.module';

import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './Prestataires/user/user.module';
import { EmployeeModule } from './Prestataires/employee/employee.module';
import { SpecialiteModule } from './Prestataires/specialite/specialite.module';
import { CompetenceModule } from './Prestataires/competence/competence.module';
import { DepartementModule } from './Prestataires/departement/departement.module';

@Module({
<<<<<<< HEAD
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1/HRmanag'),UserModule,EmployeeModule,SpecialiteModule,CompetenceModule,DepartementModule],
=======
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    BookModule,
    AuthModule,
  ],
>>>>>>> 2676f8e5a21fbcb0810cf4f735698ba0b1e36b5c
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
