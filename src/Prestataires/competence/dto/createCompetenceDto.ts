import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCompetenceDto {
  @IsNotEmpty()
  @IsString()
  readonly nom: string;

  // Autres champs nécessaires pour créer une compétence
}