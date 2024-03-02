import { Exclude } from "class-transformer";
import { IsBoolean, IsDate, IsDateString, IsNotEmpty,IsOptional,IsString, ValidateNested } from "class-validator";
import { Date } from "mongoose";
import { TypeStatutProjet, TypeStatutTache } from "../schema/Project.schema";
import { Tasks } from "../schema/Tasks.schema";
export class CreateTasksDto{

    
@IsNotEmpty()
@IsOptional()
@IsString()
NomTask:string;
@IsOptional()
@IsString()
description:string;
@IsOptional()
@IsDateString()
startDate:Date;
@IsOptional()
@IsDateString()
FinishDate?:Date
@IsOptional()
@IsString()
statut?:TypeStatutTache;
@IsNotEmpty()
projectId:string;

}
export class CreateProjectDto{
    

 @IsNotEmpty()
@IsString()
NomProject:string;
@IsOptional()
@IsString()
description?:string;
@IsOptional()
@IsDateString()
StartDate?:Date;
@IsOptional()
@IsDateString()
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
 
}