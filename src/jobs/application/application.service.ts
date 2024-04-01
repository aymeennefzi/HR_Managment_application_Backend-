import { ConsoleLogger, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Application } from '../schemas/application.schema';
import { Model, Types } from 'mongoose';
import { Job, JobSchema } from '../schemas/job.schema';
import * as fs from 'fs';
import { UpdateApplicationDto } from './dto/UpdateApplication.dto';

import { UpdateDepartmentDto } from 'src/departements/dto/UpdateDepartements.dto';



@Injectable()
export class ApplicationService {
     constructor(
    @InjectModel(Application.name) private readonly applicationmodel:Model<Application>,
    @InjectModel(Job.name) private readonly jobModel:Model<Job>){}
    private readonly logger = new ConsoleLogger(ApplicationService.name);
      async findAll(): Promise<Application[]> {
        return this.applicationmodel.find().exec();
      }
      async applyForJob(applicationData: Application, file: Express.Multer.File): Promise<Application> {
        try {
            // Gérer le fichier CV téléchargé ici
            console.log('File received:', file);
            // Enregistrer le fichier sur le serveur (par exemple, dans un dossier "uploads")
            // const filePath = 'uploads/' + file.originalname; // Définissez le chemin de destination souhaité
            const filePath = file ? 'uploads/' + file.originalname : '';
            // Sauvegarder le fichier sur le serveur
            fs.writeFileSync(filePath, file.buffer); // Cette opération peut nécessiter des vérifications supplémentaires pour la gestion des erreurs
            // Assurez-vous que le job existe
            console.log('Searching for job with ID:', applicationData.jobId);
            const job = await this.jobModel.findById(applicationData.jobId);
            if (!job) {
                console.log('Job not found');
                throw new Error('Job not found');
            }
                const newApplication = new this.applicationmodel({
                jobId: applicationData.jobId,
                title: job.title,
                candidateName: applicationData.candidateName,
                email: applicationData.email,
                cv: filePath, // Enregistrer le chemin du fichier dans la base de données
            });
            console.log('Saving application:', newApplication);
            const savedApplication = await newApplication.save();
            console.log('Application saved successfully:', savedApplication);
            return savedApplication;
        } catch (error) {
            console.error('Error applying for job:', error);
            throw error;
        }
      }
      async deleteAllCandidates(): Promise<void> {
        try {
          await this.applicationmodel.deleteMany({});
        } catch (error) {
          throw new Error(`Unable to delete all candidates: ${error}`);
        }
      }
      async deleteCandidate(id: string): Promise<void> {
        await this.applicationmodel.findByIdAndDelete(id).exec();
      }
      async updateCandidate(id: string, updateDepartmentDto: UpdateApplicationDto): Promise<Application> {
        const department = await this.applicationmodel.findByIdAndUpdate(id, updateDepartmentDto, { new: true }).exec();
        if (!department) {
          throw new NotFoundException('Department not found');
        }
        return department;
      }
      }
