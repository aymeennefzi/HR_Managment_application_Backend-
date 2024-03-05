
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { CreateEmployeeDto, CreatedEmployeeResponseDto } from './dto/createEmployeeDto';
import { SpecialiteService } from '../specialite/specialite.service';
import { Specialite } from 'src/schemas/specialite.schemas';
import { EmployeeModule } from './employee.module';
import { CompetenceService } from '../competence/competence.service';

import { Competence } from 'src/schemas/competence.schemas';
import { Employee } from 'src/schemas/employee.schemas';
import { DepartementService } from '../departement/departement.service';
import { Departement } from 'src/schemas/departement.schemas';

@Injectable()
export class EmployeeService {
    constructor(@InjectModel(Employee.name) private readonly employeeModel: Model<Employee>,
    @InjectModel(Employee.name) private readonly specialiteModel: Model<Specialite>,
    @InjectModel(Departement.name) private readonly departementModel: Model<Departement>,
    private readonly specialiteService: SpecialiteService,
    private readonly departementService: DepartementService,
     ) {}
    //  async createEmployee(createEmployeeDto: CreateEmployeeDto): Promise<{ employee: Employee, specialiteName: string,departementName:string }> {
    //     const { specialiteId,departementId, ...employeeData } = createEmployeeDto;
    
    //     // Créez une instance de Employee avec les données fournies
    //     const createdEmployee = new this.employeeModel(employeeData);
    
    //     // Récupérez l'objet Specialite associé à specialiteId
    //     const specialite = await this.specialiteService.findSpecialiteById(specialiteId);
    //     const departement = await this.departementService.finddepartementById(departementId);
    //     // Si la spécialité existe, ajoutez-la aux spécialités de l'employé
    //     if (specialite) {
    //         createdEmployee.specialites = [specialite];
    //     } else {
    //         throw new Error('Specialite not found');
    //     }
    //     if (departement) {
    //         createdEmployee.department = departement;
    //     } else {
    //         throw new Error('Specialite not found');
    //     }
    
    
    //     // Enregistrez l'employé dans la base de données
    //     await createdEmployee.save();
    
    //     return { employee: createdEmployee, specialiteName: specialite.nom };
    // }
    // 
  //   async createEmployee(createEmployeeDto: CreateEmployeeDto): Promise<CreatedEmployeeResponseDto> {
  //     const { specialiteId, departementId, ...employeeData } = createEmployeeDto;
  
  //     // Créez une instance de Employee avec les données fournies
  //     const createdEmployee = await this.employeeModel.create({
  //         ...employeeData,
  //         specialites: [specialiteId],
  //         departements: [departementId],
  //     });
  
  //     // Récupérez l'objet Specialite associé à specialiteId
  //     const specialite = await this.specialiteService.findSpecialiteById(specialiteId);
  
  //     // Si la spécialité existe, ajoutez-la aux spécialités de l'employé
  //     if (!specialite) {
  //         throw new NotFoundException('Specialite not found');
  //     }
  
  //     // Récupérez l'objet Département associé à departementId
  //     const departement = await this.departementService.finddepartementById(departementId);
  
  //     // Si le département existe, ajoutez-le à l'employé
  //     if (!departement) {
  //         throw new NotFoundException('Departement not found');
  //     }
  
  //     // Enregistrez l'employé dans la base de données
  //     await createdEmployee.save();
  
  //     // Retournez les coordonnées de l'employé, le nom de la spécialité et le nom du département
  //     return CreatedEmployeeResponseDto.fromEmployee(createdEmployee, specialite.nom, departement.name);
  // }
  async createEmployee(createEmployeeDto: CreateEmployeeDto): Promise<{ employee: Employee, specialiteName: string, departementName: string }> {
    const { specialiteId, departementId, ...employeeData } = createEmployeeDto;
  
    // Récupérez l'objet Specialite associé à specialiteId
    const specialite = await this.specialiteService.findSpecialiteById(specialiteId);
    if (!specialite) {
      throw new Error('Specialite not found');
    }
  
    // Récupérez l'objet Département associé à departementId
    const departement = await this.departementService.finddepartementById(departementId);
    if (!departement) {
      throw new Error('Departement not found');
    }
  
    // Créez une instance de Employee avec les données fournies
    const createdEmployee = new this.employeeModel({
      ...employeeData,
      specialites: [specialite],
      departement: departementId,
    });
  
    // Enregistrez l'employé dans la base de données
    await createdEmployee.save();
  
    // Ajouter l'e-mail de l'employé à la liste des membres du département
    departement.departmentMembers.push(createdEmployee.email);
    await departement.save();
  
    departement.numberOfPositions -= 1;
    await departement.save();
  
    return { employee: createdEmployee, specialiteName: specialite.nom, departementName: departement.name };
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
      
      private async createEmployeeAndAssociateSpecialite(employeeData: Partial<Employee>, specialiteId: string): Promise<Employee> {
        const createdEmployee = new this.employeeModel(employeeData);
      
        // Récupérer la spécialité
        const specialite = await this.specialiteService.findSpecialiteById(specialiteId);
      
        if (!specialite) {
            throw new Error('Specialite not found');
        }
      
        // Associer la spécialité à l'employé
        createdEmployee.specialites = [specialite]; // Supposant qu'un employé peut avoir une seule spécialité
      
        // Sauvegarder l'employé
        const savedEmployee = await createdEmployee.save();
      
        return savedEmployee;
      }
      // async getAllEmployees(): Promise<Employee[]> {
      //   return this.employeeModel.find().exec();
      // }
      async getAllEmployees(): Promise<Employee[]> {
        return this.employeeModel
          .find()
          .populate('specialites', 'nom') // Peupler le champ 'specialites' en incluant seulement le champ 'nom'
          .populate('departement', 'name') // Peupler le champ 'departement' en incluant seulement le champ 'name'
          .exec();
      }
      async getEmployeeById(employeeId: string): Promise<Employee> {
        return this.employeeModel.findById(employeeId)
        .populate('specialites', 'nom') // Peupler le champ 'specialites' en incluant seulement le champ 'nom'
        .populate('departement', 'name') 
        .exec();
      }
      async updateEmployee(employeeId: string, updateEmployeeDto: any): Promise<Employee> {
        return this.employeeModel.findByIdAndUpdate(employeeId, updateEmployeeDto, { new: true }).exec();
      }
      async deleteEmployee(employeeId: string): Promise<Employee> {
        return this.employeeModel.findByIdAndDelete(employeeId).exec();
      }

}
export function generateUniqueBatchId(): string {
    const prefix = 'BATCH';
    const date = new Date();
    const timestamp = date.getTime();
    const randomSuffix = Math.floor(Math.random() * 10000);
    return `${prefix}-${timestamp}-${randomSuffix}`;
  }