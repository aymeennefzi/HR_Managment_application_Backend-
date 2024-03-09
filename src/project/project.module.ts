import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { Project, ProjectSchema } from './schema/Project.schema';
import { Tasks, TasksSchema } from './schema/Tasks.schema';
import { TaskController } from './task/task.controller';
import { TaskService } from './task/task.service';
import { User, UserSchema } from 'src/auth/Shemas/User.shema';

@Module({
  imports:[MongooseModule.forFeature([
    { name: Project.name, schema: ProjectSchema },
    { name: Tasks.name, schema: TasksSchema },
    { name: User.name, schema: UserSchema },

  
  ]),],
  controllers: [ProjectController, TaskController],
  providers: [ProjectService, TaskService],
  exports:[ProjectService]
})
export class ProjectModule {}
