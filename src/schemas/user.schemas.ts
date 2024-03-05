import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class User extends Document {
    @Prop({ required: true })
    username: string;

    @Prop({ required: true })
    email: string;

    @Prop()
    firstName: string;

    @Prop()
    lastName: string;

    @Prop({ required: true, type: Date })
    dateOfBirth: Date;

    @Prop()
    phoneNumber: string;
    @Prop()
    Password: string;
    @Prop()
    ConfirmPassword: string;
    @Prop()
    address: string;
    @Prop()
    joindate:Date;

    @Prop()
    city: string;
    @Prop()
    Company: string;

    @Prop()
    country: string;

    @Prop()
    postalCode: string;

}
export const UserSchema = SchemaFactory.createForClass(User);