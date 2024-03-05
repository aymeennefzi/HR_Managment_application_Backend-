import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './Shemas/User.shema';
import { Model } from 'mongoose';
import * as bcrypt from  'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { signupDto } from './dto/signupDto';
import { loginDto } from './dto/login.dto';
import { MailerService } from './Mail.service';

@Injectable()
export class AuthService {
    constructor( 
        @InjectModel(User.name)
        private userMosel:Model<User>,
        private jwtservice:JwtService,
        private mailerService: MailerService,
    ){}
    async SignUp(signupDto: signupDto): Promise<{ token: string }> {
      const { name, email, password } = signupDto;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await this.userMosel.create({
        name,
        email,
        password: hashedPassword,
      });
  
      const token = this.jwtservice.sign({ id: user._id });
  
      const welcomeMessage = 'Votre compte a été créé avec succès. Veuillez attendre que l\'administrateur active votre compte.';
      await this.mailerService.sendEmail(email, 'Bienvenue sur notre plateforme', welcomeMessage);
  
      return { token };
    }
async login(logindto:loginDto): Promise<{token:string}>
{
    const {email,password}=logindto;

    const user=await  this.userMosel.findOne({email});
    if( !user ){
        throw new  UnauthorizedException('Invalid Email or Password !!!')
    }
    const isPasswordMatched=await  bcrypt.compare(password,user.password);
    if( !isPasswordMatched ){
        throw new  UnauthorizedException('Invalid Email or Password !!!')
    }
    if (!user.isActive) {
        throw new HttpException('Votre compte n\'est pas activé par l\'administrateur',400);
      }
    const token=this.jwtservice.sign({id:user.id})
 
    return {token}

}
async findByIdWithRole(id: string): Promise<User> {
    return await this.userMosel.findById(id).populate('role');
  }
  async activateUser(userId: string): Promise<User> {
    const user = await this.userMosel.findByIdAndUpdate(
      userId,
      { isActive: true },
      { new: true },
    );

    if (user) {
        const activationMessage = 'Votre compte a été activé avec succès. Vous pouvez maintenant vous connecter à notre plateforme.';
        await this.mailerService.sendEmail(user.email, 'Activation de votre compte', activationMessage);
    }

    return user;
}



}
