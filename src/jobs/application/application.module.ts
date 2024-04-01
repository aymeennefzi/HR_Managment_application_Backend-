import { Module } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { ApplicationController } from './application.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Application, ApplicationSchema } from '../schemas/application.schema';
import { JobModule } from '../job/job.module';
import { JobService } from '../job/job.service';
import { Job, JobSchema } from '../schemas/job.schema';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Application.name, schema: ApplicationSchema },
      { name: Job.name, schema: JobSchema }]),
    JobModule ,
    // Importez le module Job pour l'utiliser dans ce module
  ],
  providers: [ApplicationService,JobService],
  controllers: [ApplicationController],
  exports:[JobService]
  
})
export class ApplicationModule {}
