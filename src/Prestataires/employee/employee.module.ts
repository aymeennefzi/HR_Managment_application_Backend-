import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Employee, EmployeeSchema } from 'src/schemas/employee.schemas';
import { Specialite, SpecialiteSchema } from 'src/schemas/specialite.schemas';
import { SpecialiteModule } from '../specialite/specialite.module';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { SpecialiteService } from '../specialite/specialite.service';
import { DepartementService } from '../departement/departement.service';
import { Departement, DepartementSchema } from 'src/schemas/departement.schemas';
import { DepartementModule } from '../departement/departement.module';

@Module({

    imports: [
        MongooseModule.forFeature([
            { name: Employee.name, schema: EmployeeSchema },
            { name: Specialite.name, schema: SpecialiteSchema },
            { name: Departement.name, schema: DepartementSchema },
            
            
           
          ]),forwardRef(() => SpecialiteModule),forwardRef(()=>DepartementModule)],
        controllers: [EmployeeController],
        providers: [EmployeeService,SpecialiteService,DepartementService],
        exports: [EmployeeService]
})
export class EmployeeModule {


}
