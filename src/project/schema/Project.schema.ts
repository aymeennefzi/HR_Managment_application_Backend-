import { Prop, Schema, SchemaFactory  } from "@nestjs/mongoose";
import mongoose  from "mongoose";
import { Tasks } from "./Tasks.schema";



@Schema()
export  class Project {
@Prop({required:true})
NomProject:string;
@Prop()
description:string;
@Prop()
StartDate:string;
@Prop()
FinishDate?:string;
@Prop()
 statut?:TypeStatutProjet;
 @Prop()
 projectUrl?: string;
@Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: ()=>Tasks }] })
tasks:Tasks []; 
@Prop()
 NomChefProjet?:string
@Prop()
priority?:string;
}
export const ProjectSchema= SchemaFactory.createForClass(Project)
export enum TypeStatutProjet {
    NOUVEAU = 'nouveau',
    EN_COURS = 'en_cours',
    TERMINE = 'termine',
  }
  
  export enum TypeStatutTache {
    A_FAIRE = 'à faire',
    EN_COURS = 'en_cours',
    TERMINE = 'termine',
  }