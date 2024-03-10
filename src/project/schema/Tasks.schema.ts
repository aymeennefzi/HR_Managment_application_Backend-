import { Prop, Schema, SchemaFactory  } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "src/user/Shemas/User.shema";
import { Project, TypeStatutTache } from "./Project.schema";
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