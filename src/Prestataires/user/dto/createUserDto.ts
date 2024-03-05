import { IsDateString, IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    username: string;
  
    @IsNotEmpty()
    @IsEmail()
    email: string;
  
    @IsOptional()
    @IsString()
    firstName: string;
  
    @IsOptional()
    @IsString()
    lastName: string;
  
    @IsOptional()
    @IsDateString()
    dateOfBirth: Date;
  
    @IsOptional()
    @IsString()
    phoneNumber: string;
  
    @IsOptional()
    @IsString()
    address: string;
  
    @IsOptional()
    @IsString()
    city: string;
  
    @IsOptional()
    @IsString()
    country: string;
  
    @IsOptional()
    @IsString()
    postalCode: string;
  }