import { Exclude } from "class-transformer";
import { IsBoolean, IsDate, IsDateString, IsNotEmpty,IsOptional,IsString, Matches, ValidateNested } from "class-validator";
import { Date } from "mongoose";
import { TypeStatutProjet, TypeStatutTache } from "../schema/Project.schema";

export class CreateTasksDto{

    
@IsNotEmpty()
@IsOptional()
@IsString()
NomTask:string;
@IsOptional()
@IsString()
description?:string;
@IsOptional()
@IsString()
  @Matches(/^\d{2}\/\d{2}\/\d{4}$/, {
    message: 'startDate must be in the format DD/MM/YYYY'
  })
startDate?:Date;
@IsOptional()
@IsString()
  @Matches(/^\d{2}\/\d{2}\/\d{4}$/, {
    message: 'FinishDate must be in the format DD/MM/YYYY'
  })
FinishDate?:Date
@IsOptional()
@IsString()
statut?:TypeStatutTache;
@IsNotEmpty()
projectId:string;
@IsOptional()
@IsString()
 priority?:string;
 @IsNotEmpty()
 employeeAffected:string;
  }
  export class CreateUserDto{
    

    @IsNotEmpty()
   @IsString()
   name:string;
   @IsOptional()
   @IsString()
   email: string;
   @IsOptional()
   @IsString()
   password: string;
   @IsOptional()
   @IsString()
   isActive: boolean;
   @IsOptional()
   @IsString()
   role: string;
   @IsOptional()
   @ValidateNested()
  tasks?: CreateTasksDto; 
    
   }
export class CreateProjectDto{
    

 @IsNotEmpty()
@IsString()
NomProject:string;
@IsOptional()
@IsString()
description?:string;
@IsOptional()
@IsString()
  @Matches(/^\d{2}\/\d{2}\/\d{4}$/, {
    message: 'startDate must be in the format DD/MM/YYYY'
  })
StartDate?:Date;
@IsOptional()
@IsString()
  @Matches(/^\d{2}\/\d{2}\/\d{4}$/, {
    message: 'FinishDate must be in the format DD/MM/YYYY'
  })
FinishDate?:Date;
@IsOptional()
@IsString()
 statut?:TypeStatutProjet
 @IsOptional()
 @IsString()
 projectUrl?: string;
 @IsOptional()
 @ValidateNested()
tasks: [CreateTasksDto]; 
@IsOptional()
@IsString()
 NomChefProjet?:string
 @IsOptional()
@IsString()
 priority?:string;

}
