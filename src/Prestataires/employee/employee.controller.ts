
import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto, CreatedEmployeeResponseDto } from './dto/createEmployeeDto';
import { SpecialiteService } from '../specialite/specialite.service';
import { Employee } from 'src/schemas/employee.schemas';
@Controller('employee')
export class EmployeeController {
    constructor(private readonly employeeService: EmployeeService,
        private readonly specialiteService:SpecialiteService) {}

    @Post()
    // async create(@Body() createEmployeeDto: CreateEmployeeDto): Promise<CreatedEmployeeResponseDto> {
    //     return this.employeeService.createEmployee(createEmployeeDto);
    //   }
    async createEmployee(@Body() createEmployeeDto: CreateEmployeeDto): Promise<CreatedEmployeeResponseDto> {
      return this.employeeService.createEmployee(createEmployeeDto);
  }
            @Get()
          async getAllEmployees(): Promise<Employee[]> {
              return this.employeeService.getAllEmployees();
            }
          @Put(':id')
            async updateEmployee(@Param('id') employeeId: string, @Body() updateEmployeeDto: any): Promise<Employee> {
              return this.employeeService.updateEmployee(employeeId, updateEmployeeDto);
            }
            @Delete(':id')
            async deleteEmployee(@Param('id') employeeId: string): Promise<Employee> {
              return this.employeeService.deleteEmployee(employeeId);
            }
            @Get(':id')
            async getEmployeeById(@Param('id') id: string): Promise<Employee> {
              return this.employeeService.getEmployeeById(id);
            }
            @Post(':employeeId/specialites/:specialiteId')
            async affecterSpecialite(@Param('employeeId') employeeId: string, @Param('specialiteId') specialiteId: string): Promise<Employee> {
              try {
                return await this.specialiteService.affecterSpecialite(employeeId, specialiteId);
              } catch (error) {
                if (error instanceof NotFoundException) {
                  throw new NotFoundException(error.message);
                }
                throw error;
              }
            }
}
