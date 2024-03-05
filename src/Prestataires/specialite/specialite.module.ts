import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Employee, EmployeeSchema } from 'src/schemas/employee.schemas';
import { Specialite, SpecialiteSchema } from 'src/schemas/specialite.schemas';
import { EmployeeModule } from '../employee/employee.module';
import { SpecialiteController } from './specialite.controller';
import { SpecialiteService } from './specialite.service';
import { Competence, CompetenceSchema } from 'src/schemas/competence.schemas';

@Module({

    imports: [
        MongooseModule.forFeature([
            { name: Specialite.name, schema: SpecialiteSchema },
            {name:Employee.name,schema:EmployeeSchema},
            {name:Competence.name,schema:CompetenceSchema}

            
           
          ]), forwardRef(() => EmployeeModule),],
        controllers: [SpecialiteController],
        providers: [SpecialiteService],
        exports: [SpecialiteService]
})
export class SpecialiteModule {}
