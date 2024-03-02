import { Prop, Schema, SchemaFactory  } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Project, TypeStatutTache } from "./Project.schema";
;


@Schema()
export  class Tasks{
    @Prop({unique:true,required:true})
    NomTask:string;
    @Prop()
    description:string;
    @Prop()
    startDate:Date;
    @Prop()
    FinishDate?:Date
    @Prop()
    statut?:TypeStatutTache
    @Prop({type:mongoose.Schema.Types.ObjectId,ref:'Project'})
    Project?:Project;



}
export const TasksSchema= SchemaFactory.createForClass(Tasks)