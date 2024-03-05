import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Competence } from "./competence.schemas";

@Schema()
export class Specialite extends Document {
    @Prop({ required: true })
    nom: string;
    @Prop()
    description: string;
    @Prop({ type: [{ type: String, ref: 'Competence' }] }) // Référence aux compétences
    competences: Competence[];
}
export const SpecialiteSchema = SchemaFactory.createForClass(Specialite);