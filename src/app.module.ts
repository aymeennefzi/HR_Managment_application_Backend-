import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './Prestataires/user/user.module';
import { EmployeeModule } from './Prestataires/employee/employee.module';
import { SpecialiteModule } from './Prestataires/specialite/specialite.module';
import { CompetenceModule } from './Prestataires/competence/competence.module';
import { DepartementModule } from './Prestataires/departement/departement.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1/HRmanag'),UserModule,EmployeeModule,SpecialiteModule,CompetenceModule,DepartementModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
