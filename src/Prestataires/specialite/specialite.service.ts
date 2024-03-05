import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Specialite } from 'src/schemas/specialite.schemas';
import { CreateSpecialiteDto } from './dto/CreateSpecialiteDto';
import { Competence } from 'src/schemas/competence.schemas';
import { Employee } from 'src/schemas/employee.schemas';


@Injectable()
export class SpecialiteService {
    constructor(
        @InjectModel(Employee.name) private readonly employeeModel: Model<Employee>,
        @InjectModel(Specialite.name) private readonly specialiteModel: Model<Specialite>,
        @InjectModel(Specialite.name) private readonly competenceModel: Model<Competence>
      ) {}
      async createSpecialite(createSpecialiteDto: CreateSpecialiteDto): Promise<Specialite> {
        const createdSpecialite = new this.specialiteModel(createSpecialiteDto);
        return createdSpecialite.save();
      }
      async getAllSpecialites(): Promise<Specialite[]> {
        return this.specialiteModel.find().exec();
      }
      async getSpecialiteById(specialiteId: string): Promise<Specialite> {
        const specialite = await this.specialiteModel.findById(specialiteId).exec();
        if (!specialite) {
          throw new NotFoundException('Specialite not found');
        }
        return specialite;
      }
      async updateSpecialite(specialiteId: string, createSpecialiteDto: CreateSpecialiteDto): Promise<Specialite> {
        const updatedSpecialite = await this.specialiteModel.findByIdAndUpdate(
          specialiteId,
          createSpecialiteDto,
          { new: true }
        ).exec();
        if (!updatedSpecialite) {
          throw new NotFoundException('Specialite not found');
        }
        return updatedSpecialite;
      }
      async deleteSpecialite(specialiteId: string): Promise<Specialite> {
        const deletedSpecialite = await this.specialiteModel.findByIdAndDelete(specialiteId).exec();
        if (!deletedSpecialite) {
          throw new NotFoundException('Specialite not found');
        }
        return deletedSpecialite;
      }
      async affecterSpecialite(employeeId: string, specialiteId: string): Promise<Employee> {
        const employee = await this.employeeModel.findById(employeeId).exec();
        const specialite = await this.specialiteModel.findById(specialiteId).exec();
    
        if (!employee) {
          throw new Error('Employee not found');
        }
    
        if (!specialite) {
          throw new Error('Specialite not found');
        }
    
        employee.specialites.push(specialite);
        return await employee.save();
      }
    //   async findSpecialiteById(specialiteId: string): Promise<Specialite> {
    //     const specialite = await this.specialiteModel.findById(specialiteId).exec();
    //     if (!specialite) {
    //         throw new NotFoundException('Specialite not found');
    //     }
    //     return specialite;
    // }
    async findSpecialiteById(specialiteId: string): Promise<Specialite> {
      console.log('Recherche de la spécialité avec l\'ID :', specialiteId);
      const specialite = await this.specialiteModel.findById(specialiteId).exec();
      if (!specialite) {
          console.log('Spécialité non trouvée pour l\'ID :', specialiteId);
          throw new NotFoundException('Specialite not found');
      }
      console.log('Spécialité trouvée :', specialite);
      return specialite;
  }
    async assignCompetencesToSpecialite(batchId: string, specialiteId: string): Promise<void> {
      // Récupérer les compétences avec le batchId donné
      const competences = await this.competenceModel.find({ batchId }).exec();
      
      // Ajouter les compétences à la spécialité avec specialiteId
      await this.specialiteModel.updateOne({ _id: specialiteId }, { $push: { competences: { $each: competences } } });
    }
    
    async getCompetenceNamesById(specialiteId: string): Promise<string[]> {
      const specialite = await this.specialiteModel.findById(specialiteId).exec();
      if (!specialite) {
        throw new NotFoundException('Specialite not found');
      }
      return specialite.competences.map(comp => comp.nom);
    }
    async getCompetencesByBatchId(batchId: string): Promise<Competence[]> {
      // Recherchez la spécialité correspondant au batchId
      const specialite = await this.specialiteModel.findOne({ batchId }).exec();
    
      if (!specialite) {
          throw new Error('Specialite not found');
      }
    
      // Retournez les compétences associées à cette spécialité
      return specialite.competences;
    }
}
