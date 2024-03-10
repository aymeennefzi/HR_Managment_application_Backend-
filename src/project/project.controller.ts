import { Body, Controller, Delete, Get, HttpException, Param, Patch, Post, Sse, UsePipes, ValidationPipe } from '@nestjs/common';
import mongoose from 'mongoose';
import { NotificationService } from 'src/notification/notification.service';
import { CreateProjectDto } from './dto/CreateProject.dto';
import { ProjectService } from './project.service';

@Controller('project')
export class ProjectController {
    constructor(private projectService:ProjectService,private notificationService:NotificationService){}
   
    @Post()
    @UsePipes(new ValidationPipe())//enbales validation locally
   createUser(@Body()createuserdto:CreateProjectDto){
    console.log(createuserdto);
    return this. projectService.createProject(createuserdto);
   }
   @Get()
   getUsers(){
    return this. projectService.getProject();
   }
   @Get('/:id')
   async getProjectById(@Param('id') id:string){
   const isValid= mongoose.Types.ObjectId.isValid(id)
   if(!isValid) throw new HttpException('user not found',404) 
    const findUser= await this. projectService.getProjectById(id);
    if(!findUser) throw new HttpException('user not found',404)
    return findUser;
   }
   @Patch(':id')
   @UsePipes(new ValidationPipe())
   async updateProject(@Param('id')id:string,@Body()projectdto:CreateProjectDto){
    const isValid= mongoose.Types.ObjectId.isValid(id)
    if(!isValid) throw new HttpException('INVALID id',400) 
    const updatedUser= await this.projectService.updateProject(id,projectdto)
    if(!updatedUser) throw new HttpException('user not found',404)
    return updatedUser;
}
@Delete(':id')
async deleteProject(@Param('id') id:string){
 const isValid= mongoose.Types.ObjectId.isValid(id)
 if(!isValid) throw new HttpException('INVALID id',400) 
 const deletedEntreprise=await this.projectService.deleteProject(id)
 console.log(deletedEntreprise)

}
}