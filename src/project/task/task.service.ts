import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProjectDto, CreateTasksDto } from '../dto/CreateProject.dto';
import { Project } from '../schema/Project.schema';
import { Tasks } from '../schema/Tasks.schema';

@Injectable()
export class TaskService {
    constructor(@InjectModel(Tasks.name) private taskModel:Model<Tasks>,@InjectModel(Project.name) private projectModel:Model<Project>){}
    async createTask({projectId,...taskdto}:CreateTasksDto){
        const findProject= await this.projectModel.findById(projectId)
        if(!findProject) throw  new HttpException("project not found",400)
        const newTask=new this.taskModel(taskdto)
      const savedTask=await newTask.save()
      await this.projectModel.updateOne({_id:projectId},{$push:{tasks:savedTask._id}})
        return savedTask;
}
getTasks(){
    return this.taskModel.find();
}
getTaskById(id:string){
    return this.taskModel.findById(id).populate(['Project']);
}
updateTask(id:string,taskdto:CreateTasksDto){
  return  this.taskModel.findByIdAndUpdate(id,taskdto,{new:true})
}
async deleteTask(id: string) {
    // Delete the task by its ID and await to ensure it completes.
    const deletedTask = await this.taskModel.findByIdAndDelete(id);
    
    if (!deletedTask) {
      // Handle the case where the task does not exist.
      return null;
    }
  
    await this.projectModel.updateMany(
      {}, // This empty filter matches all documents in the collection.
      { $pull: { tasks: deletedTask._id } } // Pull the deleted task's ID from the tasks array.
    );
    
    // Return some confirmation message or the result of the update operation.
    return { message: 'Task deleted and references removed' };
  }
}
