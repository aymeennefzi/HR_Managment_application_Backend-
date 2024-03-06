import { BadRequestException, Body, HttpException, Injectable, NotFoundException, Res, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './Shemas/User.shema';
import { Model } from 'mongoose';
import * as bcrypt from  'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { signupDto } from './dto/signupDto';
import { loginDto } from './dto/login.dto';
import { MailerService } from './Mail.service';
import { UpdateProfileDto } from './dto/UpdateProfileDto';
import { UpdatePasswordDto } from './dto/UpdatePasswordDto';
import * as jwt from 'jsonwebtoken';

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
  
      const welcomeMessage = `Votre compte a été créé avec succès. Voici votre mot de passe : ${password}`;
    await this.mailerService.sendEmail(email, 'Bienvenue sur notre plateforme', welcomeMessage);
  
      return { token };
    }
// async login(logindto:loginDto): Promise<{token:string}>
// {
//     const {email,password}=logindto;

//     const user=await  this.userMosel.findOne({email});
//     if( !user ){
//         throw new  UnauthorizedException('Invalid Email or Password !!!')
//     }
//     const isPasswordMatched=await  bcrypt.compare(password,user.password);
//     if( !isPasswordMatched ){
//         throw new  UnauthorizedException('Invalid Email or Password !!!')
//     }
//     if (!user.isActive) {
//         throw new HttpException('Votre compte n\'est pas activé par l\'administrateur',400);
//       }
//     const token=this.jwtservice.sign({id:user.id})
 
//     return {token}

// }
async login(logindto: loginDto): Promise<{ token: string; expiresIn: number }> {
  const { email, password } = logindto;

  const user = await this.userMosel.findOne({ email });
  if (!user) {
    throw new UnauthorizedException('Invalid Email or Password !!!');
  }
  const isPasswordMatched = await bcrypt.compare(password, user.password);
  if (!isPasswordMatched) {
    throw new UnauthorizedException('Invalid Email or Password !!!');
  }
  if (!user.isActive) {
    throw new HttpException('Votre compte n\'est pas activé par l\'administrateur', 400);
  }
  const token = this.jwtservice.sign({ id: user.id });
  const expiresIn = 3600; 

  return { token, expiresIn };
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
      const activationMessage =
        'Votre compte a été activé avec succès. Vous pouvez maintenant vous connecter à notre plateforme.';
      await this.mailerService.sendEmail(
        user.email,
        'Activation de votre compte',
        activationMessage,
      );
    }
  
    return user;
  }
  async deactivateUser(userId: string): Promise<User> {
    const user = await this.userMosel.findByIdAndUpdate(
        userId,
        { isActive: false },
        { new: true },
    );

    if (user) {
        const deactivationMessage =
            'Votre compte a été désactivé par l admin. Si vous avez des questions, veuillez nous contacter.';
        await this.mailerService.sendEmail(
            user.email,
            'Désactivation de votre compte',
            deactivationMessage,
        );
    }

    return user;
}

  async updateUser(userId: string, updateDto: UpdateProfileDto): Promise<User> {
    const { name, email } = updateDto;

    const updatedUser = await this.userMosel.findByIdAndUpdate(
      userId,
      { name, email },
      { new: true },
    );

    return updatedUser;
  }
  async updatePassword(userId: string, updatePasswordDto: UpdatePasswordDto): Promise<void> {
    const { oldPassword, newPassword } = updatePasswordDto;

    const user = await this.userMosel.findById(userId);

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      throw new BadRequestException('Le mot de passe actuel est incorrect.');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
  }

  async sendPinCode(token: string): Promise<void> {
    const decodedToken :any = jwt.verify(token,'bahazaidi'); 
    const userId = decodedToken.id;
  
    const user = await this.userMosel.findById(userId);
  
    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }
  
    const pinCode = Math.floor(1000 + Math.random() * 9000).toString(); 
    user.pinCode = pinCode;
    await user.save();
  
    await this.mailerService.sendEmail(
      user.email,
      'Code PIN de réinitialisation du mot de passe',
      `Votre code PIN de réinitialisation du mot de passe est : ${pinCode}`,
    );
  }
  async resetPassword(newPassword: string, pinCode: string): Promise<void> {
    const user = await this.userMosel.findOne({ pinCode });

    if (!user) {
      throw new BadRequestException('Code PIN invalide');
    }

    user.password = newPassword;
    user.pinCode = null;
    await user.save();
  }
 async checkifadmin(token:string):Promise<boolean>{
  const decodedToken: any = jwt.verify(token, 'bahazaidi'); 
  const userId = decodedToken.id;
  const user = await this.findByIdWithRole(userId);
  const userRoles = user.role.map(role => role.name);
  return userRoles.includes('admin');

 }
 async checkifemailvalid(email:string):Promise<boolean>{
  const user=await this.userMosel.findOne({email});
  if(!user){return false;}
  return true;
 }
 async getAllUsers(): Promise<User[]> {
  return this.userMosel.find().exec();
}
 async getUserByToken(token:string):Promise<User>{
  const decodedToken:any =jwt.verify(token,'bahazaidi') ;
  const user = await this.userMosel.findOne({ _id:decodedToken.id })
  return user;
 }

}
