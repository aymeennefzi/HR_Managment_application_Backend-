import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Departement, DepartementSchema } from 'src/schemas/departement.schemas';
import { Employee, EmployeeSchema } from 'src/schemas/employee.schemas';
import { EmployeeModule } from '../employee/employee.module';
import { DepartementController } from './departement.controller';
import { DepartementService } from './departement.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Departement.name, schema: DepartementSchema },
            {name:Employee.name,schema:EmployeeSchema},
            

            
           
          ]), forwardRef(() => EmployeeModule),],
        controllers: [DepartementController],
        providers: [DepartementService],
        exports: [DepartementService]
})
export class DepartementModule {}
