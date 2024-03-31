import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Role } from './Roles.Shema';
import {Leave} from "../../conges/Schema/Leaves.schema";
import {Attendance} from "../../attendance/Schema/Attendance.schema";



@Schema({
    timestamps: true,
  })
  export class User extends Document{
      @Prop()
      firstName:string;

      @Prop()
      lastName:string;

      @Prop( {unique:[true,"duplicated email entred"]})
      email: string;

      @Prop()
      password: string;

      @Prop({ default: false })
      isActive: boolean;

      @Prop({ type: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' }})
      role: Role ;

      @Prop({ type: String, default: null })
      pinCode: string;

      @Prop()
      etablissement : string

      @Prop()
      Matricule : string ;
      
      @Prop()
      EmailSecondaire : string

      @Prop()
      TelSecondaire : string

      @Prop()
      dateEntree : string ;
      

      @Prop()
      Tel : string

      @Prop()
      fonction : string
     
      @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: ()=>Leave }] })
      leaves:Leave [];

      @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Attendance' }] })
      attendances: Attendance[];

      @Prop()
      soldeConges : number ;

      @Prop()
      soldeMaladie : number ;

      @Prop({nullable: true})
      profileImage: string;

      @Prop()
      location : string ;

      @Prop()
      city : string ;
      
      @Prop()
      adresse : string ;
      
      @Prop()
      country : string ;
      
      @Prop()
      aboutme : string ;
      
      @Prop()
      education : string ;
      
      @Prop()
      experience : string ;
      
      @Prop()
      skills : string ;
      
      @Prop()
      datebirth : string ;
  }

    export const  UserSchema=SchemaFactory.createForClass(User);
