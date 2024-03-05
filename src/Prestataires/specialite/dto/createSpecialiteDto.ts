import { IsNotEmpty, IsString } from "class-validator";


export class CreateSpecialiteDto{
@IsNotEmpty()
@IsString()
readonly nom: string;

@IsString()
readonly description: string;
}