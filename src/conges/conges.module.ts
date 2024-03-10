import { Module} from '@nestjs/common';
import {CongeService} from "./Conge.service";
import {CongeController} from "./Conge.controller";
import {MongooseModule} from "@nestjs/mongoose"
import {User, UserSchema} from "../auth/Shemas/User.shema";
import {Leave, LeaveSchema} from "./Schema/Leaves.schema";
import {AuthModule} from "../auth/auth.module";
import {AuthService} from "../auth/auth.service";
import {JwtService} from "@nestjs/jwt";
import {MailerService} from "../auth/Mail.service";
import { Roleservice } from 'src/auth/Role.service';
import { Role, RoleSchema } from 'src/auth/Shemas/Roles.Shema';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Leave.name, schema: LeaveSchema },
      {name : User.name , schema : UserSchema},
      {name :  Role.name , schema : RoleSchema}
    ]),
      AuthModule
  ],
  controllers :[CongeController],
  providers: [ CongeService , AuthService , JwtService , MailerService , Roleservice ],

})
export class CongesModule {}
