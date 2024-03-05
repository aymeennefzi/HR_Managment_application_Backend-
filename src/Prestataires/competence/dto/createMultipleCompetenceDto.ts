import { Type } from "class-transformer";
import { IsArray, ValidateNested } from "class-validator";
import { CreateCompetenceDto } from "./CreateCompetenceDto";

export class CreateMultipleCompetencesDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateCompetenceDto)
    competences: CreateCompetenceDto[];
  }