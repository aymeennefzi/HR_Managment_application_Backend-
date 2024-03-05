import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
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
    @Prop({ default: false }) 
    isActive: boolean;
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }] })
    role: Role [];
  }

    export const  UserSchema=SchemaFactory.createForClass(User);