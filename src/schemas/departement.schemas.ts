import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema()
export class Departement extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  departmentHead: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop()
  budget: number;

  @Prop()
  address: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  email: string;

  @Prop({ enum: ['active', 'inactive'], default: 'active' })
  status: string;

  @Prop({ type: Number, default: 0 })
  numberOfPositions: number;

  @Prop({ type: Number, default: 0 })
  numberOfRecruitments: number;

  // @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Employee' }] })
  // departmentMembers: string[];
  @Prop({ type: [String] }) // Modifier le type pour stocker les e-mails
  departmentMembers: string[];
}

export const DepartementSchema = SchemaFactory.createForClass(Departement);
export enum DepartmentStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
  }