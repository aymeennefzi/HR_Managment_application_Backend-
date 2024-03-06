import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, {Document, Types} from 'mongoose';
import {Personnel} from "./Presonnel.schema";


export enum LeaveType {
    SickLeave = 'Sick Leave',
    PaidLeave = 'paid leave',
    Unpaidleave = 'Unpaid leave',
    Bereavement = 'Bereavement',
    PersonalReasons = 'Personal Reasons',
    Maternity = 'Maternity',
    Paternity = 'Paternity',
    RTT = 'RTT' ,
    Other = 'Other',
}

export enum Status {
    Pending= 'Pending',
    Approved = 'Approved',
    Declined = 'Declined'
}

export enum TimeOfDay {
    Morning = 'Morning',
    Afternoon = 'Afternoon',
    noone = 'No One',
}

@Schema()
export class Leave extends Document {
    @Prop({ required: true, enum: Object.values(LeaveType) })
    leaveType: LeaveType;

    @Prop({ required: true })
    startDate: string;

    @Prop({ required: true })
    endDate: string;

    @Prop()
    reason?: string;

    @Prop({ default: 'Pending' })
    status: string;

    @Prop({ required: true, enum: Object.values(TimeOfDay) })
    startTime: TimeOfDay;

    @Prop({ required: true, enum: Object.values(TimeOfDay) })
    endTime: TimeOfDay;

    @Prop()
    motifRefus?: string;

    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop({ default: Date.now })
    updatedAt: Date;

    @Prop({ type: Types.ObjectId, ref: 'Personnel', required: true })
    personnel: Personnel;
}

export const LeaveSchema = SchemaFactory.createForClass(Leave);
