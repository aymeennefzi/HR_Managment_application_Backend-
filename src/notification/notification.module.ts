import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Notification, NotificationSchema } from './notification.schema';
import { ProjectService } from 'src/project/project.service';
import { Project, ProjectSchema } from 'src/project/schema/Project.schema';
import { Tasks, TasksSchema } from 'src/project/schema/Tasks.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Notification.name, schema: NotificationSchema },
      { name: Project.name, schema: ProjectSchema },
        { name: Tasks.name, schema: TasksSchema }])
  ],
  providers: [NotificationService,ProjectService],
  controllers: [NotificationController],
  exports:[NotificationService]
})
export class NotificationModule {}
