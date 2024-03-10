import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotificationService } from 'src/notification/notification.service';
import { CreateProjectDto } from './dto/CreateProject.dto';
import { Project } from './schema/Project.schema';
import { Tasks } from './schema/Tasks.schema';

@Injectable()
export class ProjectService {
    constructor(@InjectModel(Project.name) private projectModel:Model<Project>,@InjectModel(Tasks.name) private taskModel:Model<Tasks>,private notificationService:NotificationService){}
    createProject(projectdto:CreateProjectDto){
        const newEntreprise= new this.projectModel(projectdto)
       const createNotificationsDto = {
            title: `New Project added: ${projectdto.NomProject}`,
            description: 'Click here to view more.' 
          };
          this.notificationService.createNotification(createNotificationsDto); 
        return newEntreprise.save();
}
    async getProject():Promise<Project[]>{
        
       let projects= await   this.projectModel.find();
       return projects;
    }
    getProjectById(id:string){
        return this.projectModel.findById(id).populate(['tasks']);
    }
    updateProject(id:string,projectdto:CreateProjectDto){
      return  this.projectModel.findByIdAndUpdate(id,projectdto,{new:true})
    }
    async deleteProject(id:string){
       
   const del= this.projectModel.findByIdAndDelete(id);
        await this.taskModel.deleteOne({},{ projectId: id});
     return del
      }
}
