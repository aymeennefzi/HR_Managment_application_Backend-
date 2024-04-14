import {Room} from './room.model';
import {ObjectID} from 'bson';
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Types} from "mongoose";
import { User } from 'src/auth/Shemas/User.shema';

@Schema()
export class Message {

  _id: ObjectID | string;

  @Prop({required: true})
  text: string;

  @Prop({required: true})
  created: Date;

  @Prop({required: true, ref: 'User', type: Types.ObjectId})
  owner: User;

  @Prop({required: true, ref: 'Room', type: Types.ObjectId})
  room: Room | string;
}

export const MessageSchema = SchemaFactory.createForClass(Message)
