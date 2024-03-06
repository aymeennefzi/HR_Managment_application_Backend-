import { Body, Controller, Get, Param, Patch, Post, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signupDto } from './dto/signupDto';
import { loginDto } from './dto/login.dto';
import { User } from './Shemas/User.shema';
import { RolesGuard } from './Guards/Role.guard';
import { Roles } from './Decorators/Roledecatror';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { UpdateProfileDto } from './dto/UpdateProfileDto';
import { UpdatePasswordDto } from './dto/UpdatePasswordDto';
import { ForgotPasswordDto } from './dto/ForgotPasswordDto';
import { ResetPasswordDto } from './dto/ResetPasswordDto';

@Controller('auth')
export class AuthController {
    constructor(private authservice:AuthService){}

    @Post('/signup')
  async signup(@Body()signupdto:signupDto):Promise<{token:string}>{
    console.log(signupDto);
    return this.authservice.SignUp(signupdto);
   
}
    @Post('/login')
  async login(@Body()logindto:loginDto,  @Res({ passthrough: true }) res: Response):Promise<{token:string}>{
    const { token, expiresIn } = await this.authservice.login(logindto);
    res.cookie('user_token', token, {
      httpOnly: true,
      expires: new Date(Date.now() + expiresIn * 1000), // Expiration du cookie en millisecondes
    });
    return { token };
    

  }
  @Get('/findrole')
  async findWithRole(@Body('id') id: string): Promise<User> {
    return this.authservice.findByIdWithRole(id);
  }

  @Get('/check-admin')
  async checkAdmin(@Req() request: Request): Promise<boolean> {
    const authorizationHeader = request.headers['authorization'];
    if (!authorizationHeader) {
      throw new UnauthorizedException('Authorization header missing');
    }
  
    const token = authorizationHeader.split(' ')[1];
    let itsadmin = await this.authservice.checkifadmin(token);
    console.log(itsadmin);
    return itsadmin;
  }
  


  @Post('/activate')
  // @Roles('admin')
  // @UseGuards(RolesGuard)
  async activateUser(@Body('userId') userId: string): Promise<User> {
    try {
      const user = await this.authservice.activateUser(userId);
      return user;
    } catch (error) {
      throw new Error("Une erreur s'est produite lors de l'activation de l'utilisateur.");
    }
  }
  @Post('/deactivate')
  // @Roles('admin')
  // @UseGuards(RolesGuard)
  async deactivateUser(@Body('userId') userId:string):Promise<User>{
    try{
      const user=await this.authservice.deactivateUser(userId);
      return user;
    }
    catch(error){
      throw new Error("une erreur s' est produite lors de la deseactivation de compte")
    }
  }
  @Post('/logout')
 @UseGuards(AuthGuard())
  async logout(@Res({ passthrough: true }) res: Response): Promise<void> {
    console.log(res.cookie);
    res.clearCookie('user_token');
  }

  @Patch('/update-profile')
  @UseGuards(AuthGuard())
  async updateProfile(@Req() req: Request, @Body() updateDto: UpdateProfileDto): Promise<User> {
    const { user } = req as any;
    const updatedUser = await this.authservice.updateUser(user.id, updateDto);
    return updatedUser;
  }
  @Patch('/update-password')
  @UseGuards(AuthGuard())
  async updatePassword(@Req() req: Request, @Body() updatePasswordDto: UpdatePasswordDto): Promise<void> {
    const { user } = req as any;
    await this.authservice.updatePassword(user.id, updatePasswordDto);
  }

  @Post('/forgot-password')
  // @UseGuards(AuthGuard())
  async forgotPassword(@Req() request: Request): Promise<void> {
    const token = request.headers['authorization'].split(' ')[1];
    console.log(token); 
    await this.authservice.sendPinCode(token);
  }
  @Post('/reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto): Promise<void> {
    const { newPassword, pinCode } = resetPasswordDto;
    await this.authservice.resetPassword(newPassword, pinCode);
  }

  @Get('isemailvalid')
  async  isEmailValid(@Body('email') email:string):Promise<boolean>
  {
    return this.isEmailValid(email);
  }
  @Get('allusers')
  async getAllUsers(): Promise<User[]> {
    return this.authservice.getAllUsers();
  }
  @Get('userbytoken')
  @UseGuards(AuthGuard())
  async getUserByToken(@Req() request: Request): Promise<User> {
    const token = request.headers['authorization'].split(' ')[1];
    const user = await this.authservice.getUserByToken(token);
    return user;
  }
}
