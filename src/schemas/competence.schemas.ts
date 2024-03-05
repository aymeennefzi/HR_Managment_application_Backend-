import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CompetenceDocument = Competence & Document;

@Schema()
export class Competence extends Document {
  @Prop({ required: true })
  nom: string;
  @Prop({ required: true })
  batchId: string; // Ajoutez le batchId au schéma
}

export const CompetenceSchema = SchemaFactory.createForClass(Competence);