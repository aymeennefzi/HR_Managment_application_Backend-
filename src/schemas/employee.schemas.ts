import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaType, Types } from "mongoose";
import { Specialite } from "./specialite.schemas";
import * as mongoose from 'mongoose'; 
import { CreateEmployeeDto } from "src/Prestataires/employee/dto/createEmployeeDto";
import { User, UserSchema } from "./user.schemas";
import { Departement } from "./departement.schemas";

Types
@Schema()
export class Employee extends User {
    

    @Prop()
    department: string;

    @Prop()
    position: string;

   

    @Prop({ required: true, type: Date })
    hireDate: Date;
    @Prop()
    salary: number;

    // @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Specialite' }] }) // Utilisez Types.ObjectId
    // specialites: Specialite[];
    @Prop({ type: [{ type: 'ObjectId', ref: 'Specialite' }] })
    specialites: Specialite[];
    // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Department' })
    // departement: mongoose.Types.ObjectId;
    // @Prop({ type: [{ type: 'ObjectId', ref: 'Departement' }] })
    // departements: Departement[];
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Departement' })
    departement: mongoose.Types.ObjectId;
    toDto(this: Employee) {
        return {
            username: this.username,
            email: this.email,
            firstName: this.firstName,
            lastName: this.lastName,
            dateOfBirth: this.dateOfBirth,
            department: this.department,
            position: this.position,
            hireDate: this.hireDate,
            salary: this.salary,
            specialites: this.specialites.map(specialite => specialite.nom),
            // specialiteId: this.specialites.map(specialite => specialite._id.toString()) // Convertit les IDs en chaînes
        };
    }
}
export const EmployeeSchema = SchemaFactory.createForClass(Employee);