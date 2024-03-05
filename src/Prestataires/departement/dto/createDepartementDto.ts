import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { DepartmentStatus } from "src/schemas/departement.schemas";


export class CreateDepartementDto {
    @IsNotEmpty()
    @IsString()
    name: string;
  
    @IsOptional()
    @IsString()
    description?: string;
  
    @IsOptional()
    @IsString()
    departmentHead?: string;
  
    @IsOptional()
    @IsDateString()
    createdAt?: Date;
  
    @IsOptional()
    @IsNumber()
    budget?: number;
  
    @IsOptional()
    @IsString()
    address?: string;
  
    @IsOptional()
    @IsString()
    phoneNumber?: string;
  
    @IsOptional()
    @IsString()
    email?: string;
  
    @IsOptional()
    @IsEnum(DepartmentStatus)
    status?: DepartmentStatus;
  
    @IsOptional()
    @IsNumber()
    numberOfPositions?: number;
  
    @IsOptional()
    @IsNumber()
    numberOfRecruitments?: number;
  }