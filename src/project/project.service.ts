import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProjectDto } from './dto/CreateProject.dto';
import { Project } from './schema/Project.schema';
import { Tasks } from './schema/Tasks.schema';

@Injectable()
export class ProjectService {
    constructor(@InjectModel(Project.name) private projectModel:Model<Project>,@InjectModel(Tasks.name) private taskModel:Model<Tasks>){}
    createProject(projectdto:CreateProjectDto){
        const newEntreprise= new this.projectModel(projectdto)
        return newEntreprise.save();
}
    getProject(){
        return this.projectModel.find();
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
