import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { DepartementService } from './departement.service';
import { CreateDepartementDto } from './dto/createDepartementDto';
import { Departement, DepartmentStatus } from 'src/schemas/departement.schemas';

@Controller('departement')
export class DepartementController {
    constructor(private readonly departementservice: DepartementService) {}

    @Post()
    async createdepartement(@Body() CreateDepartmentDto: CreateDepartementDto): Promise<Departement> {
        return this.departementservice.createdepartement(CreateDepartmentDto);
      }

      @Get()
      async getAlldepartements(): Promise<Departement[]> {
        return this.departementservice.getAlldepartements();
      }
      @Get(':id')
      async getdepartementById(@Param('id') departementId: string): Promise<Departement> {
        return this.departementservice.getdepartementById(departementId);
      }
    @Put(':id')
      async updatedepartement(@Param('id') departementId: string, @Body() CreateDepartmentDto: CreateDepartementDto): Promise<Departement> {
        return this.departementservice.updateDepartement(departementId, CreateDepartmentDto);
      }

      @Delete(':id')
      async deleteSpecialite(@Param('id') departementId: string): Promise<Departement> {
        return this.departementservice.deletedepartement(departementId);
      }
}
