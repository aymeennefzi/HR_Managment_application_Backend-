import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signupDto } from './dto/signupDto';
import { loginDto } from './dto/login.dto';
import { User } from './Shemas/User.shema';
import { RolesGuard } from './Guards/Role.guard';
import { Roles } from './Decorators/Roledecatror';

@Controller('auth')
export class AuthController {
    constructor(private authservice:AuthService){}

    @Post('/signup')
  async signup(@Body()signupdto:signupDto):Promise<{token:string}>{
    return this.authservice.SignUp(signupdto);
}
    @Get('/login')
  async login(@Body()logindto:loginDto):Promise<{token:string}>{
    return this.authservice.login(logindto);

  }
  @Get('/findrole/:id')
  async  findwithrole(@Param('id') id :string):Promise<User>{
    return  this.authservice.findByIdWithRole(id);
  }

  @Post(':userId/activate')
  @Roles('admin')
  @UseGuards(RolesGuard)
  async activateUser(@Param('userId') userId: string): Promise<User> {
    try {
      const user = await this.authservice.activateUser(userId);
      return user;
    } catch (error) {
      throw new Error('Une erreur s\'est produite lors de l\'activation de l\'utilisateur.');
    }
  }

}
