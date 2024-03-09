import { Prop, Schema, SchemaFactory  } from "@nestjs/mongoose";
import mongoose from "mongoose";

import { Project, TypeStatutTache } from "./Project.schema";
import { User } from "src/auth/Shemas/User.shema";
;


@Schema()
export  class Tasks{
    @Prop({required:true})
    NomTask:string;
    @Prop()
    description:string;
    @Prop()
    startDate:string;
    @Prop()
    FinishDate?:string
    @Prop()
    statut?:TypeStatutTache
    @Prop({type:mongoose.Schema.Types.ObjectId,ref:'Project'})
    Project?:Project;
    @Prop()
    priority?:string;
    @Prop({type:mongoose.Schema.Types.ObjectId,ref:'User'})
    employeeAffected?:User;



}
export const TasksSchema= SchemaFactory.createForClass(Tasks)