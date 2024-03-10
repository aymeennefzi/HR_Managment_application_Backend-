import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Tasks } from 'src/project/schema/Tasks.schema';
import { Role } from './Roles.Shema';

@Schema({
    timestamps: true,
  })
  export class User extends Document{
    @Prop()
    name:string;
    @Prop( {unique:[true,"duplicated email entred"]})
    email: string;
    @Prop()
    password: string;
    @Prop({ default: true }) 
    isActive: boolean;
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }] })
    role: Role [];
     @Prop({ type: String, default: null })
     pinCode: string;
     @Prop({type:mongoose.Schema.Types.ObjectId,ref:'Tasks'})
Tasks?:Tasks;
  }

    export const  UserSchema=SchemaFactory.createForClass(User);