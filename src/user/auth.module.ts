import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './Shemas/User.shema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { jwtstrategy } from './jwt.strategy';
import { Rolecontroller } from './Role.controller';
import { Roleservice } from './Role.service';
import { RoleSchema } from './Shemas/Roles.Shema';
import { MailerService } from './Mail.service';
@Module({
  imports:[
    PassportModule.register({defaultStrategy:'jwt'}),
    JwtModule.registerAsync({
      inject:[ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string | number>('JWT_EXPIRE')
        }
      })
    }),
    MongooseModule.forFeature([{name:User.name ,schema:UserSchema},
     { name: 'Role', schema: RoleSchema }])
  ],
  controllers: [AuthController,Rolecontroller],
  providers: [AuthService,jwtstrategy,Roleservice,MailerService],
  exports:[jwtstrategy,PassportModule]
})

export class AuthModule {}
