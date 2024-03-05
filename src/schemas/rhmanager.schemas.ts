import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User, UserSchema } from "./user.schemas";


@Schema()
export class RHManager extends User{
  
    @Prop({ required: true })
    department: string;

    @Prop()
    responsibilities: string[];

    
}export const RHManagerSchema = SchemaFactory.createForClass(RHManager).add(UserSchema);