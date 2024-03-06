import { Module} from '@nestjs/common';
import {CongeService} from "./Conge.service";
import {CongeController} from "./Conge.controller";
import {MongooseModule} from "@nestjs/mongoose"
import {Leave, LeaveSchema} from "../Shemas/Leaves.schema";
import {PersonnelModule} from "../personnel/personnel.module";
import {PersonnelService} from "../personnel/Personnel.service";
import {Personnel, PersonnelSchema} from "../Shemas/Presonnel.schema";


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Leave.name, schema: LeaveSchema },
      {name : Personnel.name , schema : PersonnelSchema}
    ]),
  PersonnelModule
  ],
  controllers :[CongeController],
  providers: [ CongeService , PersonnelService ],

})
export class CongesModule {}
