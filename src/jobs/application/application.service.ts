import { ConsoleLogger, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Application } from '../schemas/application.schema';
import { Model, Types } from 'mongoose';
import { Job, JobSchema } from '../schemas/job.schema';
import * as fs from 'fs';
import { UpdateApplicationDto } from './dto/UpdateApplication.dto';
import { Logger } from 'sass';
import { UpdateDepartmentDto } from 'src/departements/dto/UpdateDepartements.dto';



@Injectable()
export class ApplicationService {
     constructor(
    @InjectModel(Application.name) private readonly applicationmodel:Model<Application>,
    @InjectModel(Job.name) private readonly jobModel:Model<Job>){}
    private readonly logger = new ConsoleLogger(ApplicationService.name);
    // async applyForJob(applicationData: Application): Promise<Application> {
    //     // Gérer le fichier CV ici
    //     const filePath = 'chemin/vers/le/fichier/cv';
    //     const job = await this.jobModel.findById(applicationData.jobId);
    //     if (!job) {
    //         throw new Error('Job not found');
    //     }
    
    //     // Créer une nouvelle instance de l'application avec les données et le chemin du fichier
    //     const newApplication = new this.applicationmodel({
    //       jobId: applicationData.jobId,
    //       title: job.title,
    //       candidateName: applicationData.candidateName,
    //       email: applicationData.email,
    //       cv: filePath, // Enregistrer le chemin du fichier dans la base de données
          
    //     });
    //     const savedApplication = await newApplication.save();
    //     // Enregistrer la nouvelle candidature dans la base de données
    //      const populatedApplication = await this.applicationmodel.findById(savedApplication._id).populate('jobId', 'title');
    
    //     // Renvoyer la candidature enregistrée
    //     return populatedApplication;
    //   }
      async findAll(): Promise<Application[]> {
        return this.applicationmodel.find().exec();
      }
    //   async applyForJob(applicationData: Application, file: Express.Multer.File): Promise<Application> {
    //     try {
    //         // Gérer le fichier CV téléchargé ici
    //         console.log('File received:', file);
    
    //         const filePath = file.path;
    //         console.log("ID du job:", applicationData.jobId);
          
    //         // Assurez-vous que le job existe
    //         console.log('Searching for job with ID:', applicationData.jobId);
    //         const job = await this.jobModel.findById(applicationData.jobId);
    //         if (!job) {
    //             console.log('Job not found');
    //             throw new Error('Job not found');
    //         }
          
    //         // Créer une nouvelle instance de candidature avec les données et le chemin du fichier
    //         const newApplication = new this.applicationmodel({
    //             jobId: applicationData.jobId,
    //             title: job.title,
    //             candidateName: applicationData.candidateName,
    //             email: applicationData.email,
    //             cv: filePath, // Enregistrer le chemin du fichier dans la base de données
    //         });
          
    //         // Enregistrer la nouvelle candidature dans la base de données
    //         console.log('Saving application:', newApplication);
    //         const savedApplication = await newApplication.save();
          
    //         // Renvoyer la candidature enregistrée
    //         console.log('Application saved successfully:', savedApplication);
    //         return savedApplication;
    //     } catch (error) {
    //         console.error('Error applying for job:', error);
    //         throw error;
    //     }
    // }
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
    
            // Créer une nouvelle instance de candidature avec les données et le chemin du fichier
            const newApplication = new this.applicationmodel({
                jobId: applicationData.jobId,
                title: job.title,
                candidateName: applicationData.candidateName,
                email: applicationData.email,
                cv: filePath, // Enregistrer le chemin du fichier dans la base de données
            });
    
            // Enregistrer la nouvelle candidature dans la base de données
            console.log('Saving application:', newApplication);
            const savedApplication = await newApplication.save();
    
            // Renvoyer la candidature enregistrée
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
    
      // async updateCandidate(candidateId: string, updateCandidateDto: UpdateApplicationDto): Promise<Application> {
      //   return await this.applicationmodel.findByIdAndUpdate(candidateId, updateCandidateDto, { new: true });
      // }
      // async updateCandidate(candidateId: string, updateCandidateDto: UpdateApplicationDto): Promise<Application> {
      //   try {
      //     const updatedCandidate = await this.applicationmodel.findByIdAndUpdate(
      //       candidateId,
      //       updateCandidateDto,
      //       { new: true }
      //     );
      //     return updatedCandidate;
      //   } catch (error) {
      //     // Gérer les erreurs ici, par exemple :
      //     console.error('Error updating candidate:', error);
      //     throw error; // Vous pouvez choisir de relancer l'erreur ou de la traiter différemment
      //   }
      async updateCandidate(id: string, updateDepartmentDto: UpdateApplicationDto): Promise<Application> {
        const department = await this.applicationmodel.findByIdAndUpdate(id, updateDepartmentDto, { new: true }).exec();
        if (!department) {
          throw new NotFoundException('Department not found');
        }
        return department;
      }
      }

