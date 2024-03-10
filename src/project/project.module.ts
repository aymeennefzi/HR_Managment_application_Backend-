import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Notification, NotificationSchema } from 'src/notification/notification.schema';
import { NotificationService } from 'src/notification/notification.service';
import { User, UserSchema } from 'src/user/Shemas/User.shema';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { Project, ProjectSchema } from './schema/Project.schema';
import { Tasks, TasksSchema } from './schema/Tasks.schema';
import { TaskController } from './task/task.controller';
import { TaskService } from './task/task.service';

@Module({
  imports:[MongooseModule.forFeature([
    { name: Project.name, schema: ProjectSchema },
    { name: Tasks.name, schema: TasksSchema },
    { name: User.name, schema: UserSchema },
    { name: Notification.name, schema: NotificationSchema  },
  ]),],
  controllers: [ProjectController, TaskController],
  providers: [ProjectService, TaskService,NotificationService],
  exports:[ProjectService]
})
export class ProjectModule {}
