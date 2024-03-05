import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDepartementDto } from './dto/createDepartementDto';
import { Departement } from 'src/schemas/departement.schemas';
import { InjectModel } from '@nestjs/mongoose';
import { Model, model } from 'mongoose';
model

@Injectable()
export class DepartementService {
    constructor(
        // @InjectModel(Employee.name) private readonly employeeModel: Model<Employee>,
        @InjectModel(Departement.name) private readonly departementModel: Model<Departement>,
        // @InjectModel(Specialite.name) private readonly competenceModel: Model<Competence>
      ) {}
      async createdepartement(CreateDepartmentDto: CreateDepartementDto): Promise<Departement> {
        const createdepartement = new this.departementModel(CreateDepartmentDto);
        return createdepartement.save();
      }
      async getAlldepartements(): Promise<Departement[]> {
        return this.departementModel.find().exec();
      }
      async getSpecialiteById(departementId: string): Promise<Departement> {
        const departement = await this.departementModel.findById(departementId).exec();
        if (!departement) {
          throw new NotFoundException('Specialite not found');
        }
        return departement;
      }
      async updateDepartement(departementIdId: string, createDepartementDto: CreateDepartementDto): Promise<Departement> {
        const updatedDepartement = await this.departementModel.findByIdAndUpdate(
          departementIdId,
          createDepartementDto,
          { new: true }
        ).exec();
        if (!updatedDepartement) {
          throw new NotFoundException('Specialite not found');
        }
        return updatedDepartement;
      }
      async deletedepartement(departementId: string): Promise<Departement> {
        const deleteddepartement = await this.departementModel.findByIdAndDelete(departementId).exec();
        if (!deleteddepartement) {
          throw new NotFoundException('Specialite not found');
        }
        return deleteddepartement;
      }
      async getdepartementById(departementId: string): Promise<Departement> {
        const departement = await this.departementModel.findById(departementId).exec();
        if (!departement) {
          throw new NotFoundException('Specialite not found');
        }
        return departement;
      }
      async finddepartementById(departementId: string): Promise<Departement> {
        const departement = await this.departementModel.findById(departementId).exec();
        if (!departement) {
            throw new NotFoundException('Specialite not found');
        }
        return departement;
    }
}
