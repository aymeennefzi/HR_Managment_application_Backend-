// update-profile.dto.tss
import { IsString, IsEmail } from 'class-validator';

export class UpdateProfileDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;
}