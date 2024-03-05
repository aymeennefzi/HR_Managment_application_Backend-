import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class signupDto{
   @IsNotEmpty()
   @IsString()
     name:string;
   @IsNotEmpty()
   @IsEmail({},{message:"please enter a valid email"})
    email:string;
   @IsNotEmpty()
   @IsString()
   @MinLength(6,{ message:"password should have at least 6 characters"})
    password:string;
}