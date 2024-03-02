import { Prop, Schema, SchemaFactory  } from "@nestjs/mongoose";
import mongoose  from "mongoose";
import { Tasks } from "./Tasks.schema";



@Schema()
export  class Project {
@Prop({unique:true,required:true})
NomProject:string;
@Prop()
description:string;
@Prop()
StartDate:Date;
@Prop()
FinishDate?:Date;
@Prop()
 statut?:TypeStatutProjet;
 @Prop()
 projectUrl?: string;
@Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: ()=>Tasks }] })
tasks:Tasks []; 
@Prop()
 NomChefProjet?:string
}
export const ProjectSchema= SchemaFactory.createForClass(Project)
export enum TypeStatutProjet {
    NOUVEAU = 'nouveau',
    EN_COURS = 'en cours',
    TERMINE = 'terminé',
  }
  
  export enum TypeStatutTache {
    A_FAIRE = 'à faire',
    EN_COURS = 'en cours',
    TERMINE = 'terminé',
  }