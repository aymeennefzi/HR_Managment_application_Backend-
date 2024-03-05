import { IsArray, IsDate, IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { EmployeeModule } from "../employee.module";
import { Employee } from "src/schemas/employee.schemas";
Employee


export class CreateEmployeeDto {
    username: string;
    email: string;
    firstName: string;
    lastName: string;

    @IsDateString()
    dateOfBirth: Date;
    Password: string;
    
    ConfirmPassword: string;

    position: string;
    department: string;
    salary: number;

    @IsDateString()
    hireDate: Date;
    
    @IsNotEmpty()
    @IsString()
    specialiteId: string;
    @IsNotEmpty()
    @IsString()
    departementId: string;
}
export class CreatedEmployeeResponseDto {
    employee: Employee; // Assurez-vous que le type correspond à celui renvoyé par votre service
    specialiteName: string;
    departementName:string

    // Vous pouvez également définir une méthode pour construire l'objet de réponse
    static fromEmployee(employee: Employee, specialiteName: string,departementName:string): CreatedEmployeeResponseDto {
        const response = new CreatedEmployeeResponseDto();
        response.employee = employee;
        response.specialiteName = specialiteName;
        response.departementName = departementName;
        return response;
    }
}