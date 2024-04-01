import { Body, ConsoleLogger, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { Application } from '../schemas/application.schema';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateApplicationDto } from './dto/UpdateApplication.dto';
import { UpdateDepartmentDto } from 'src/departements/dto/UpdateDepartements.dto';

@Controller('application')
export class ApplicationController {

constructor(private readonly applicationservice:ApplicationService){}
private readonly logger = new ConsoleLogger(ApplicationController.name);
// @Post()
//     async applyForJob(@Body() applicationData: Application): Promise<Application> {
//         return this.applicationservice.applyForJob(applicationData);
//       }

      @Get()
      async findAll(): Promise<Application[]> {
        return this.applicationservice.findAll();
      }
      @Post()
  @UseInterceptors(FileInterceptor('cv'))
  async applyForJob(@UploadedFile() file: Express.Multer.File, @Body() applicationData: Application): Promise<Application> {
    return this.applicationservice.applyForJob(applicationData, file);
  }
  @Post('upload') // Le chemin de l'endpoint
  @UseInterceptors(FileInterceptor('file')) // 'file' est le nom du champ dans FormData
  async uploadFile(@UploadedFile() file) {
    console.log(file); // Traitez le fichier téléchargé ici
  }
  @Post('/delete-all')
  async deleteAllCandidates(): Promise<string> {
    await this.applicationservice.deleteAllCandidates();
    return 'All candidates deleted successfully';
  }
  @Delete(':id')
  async deleteCandidate(@Param('id') id: string): Promise<void> {
    await this.applicationservice.deleteCandidate(id);
  }
  // @Put(':id')
  // async updateCandidate(@Param('id') id: string, @Body() updateCandidateDto: UpdateApplicationDto) {
  //   return this.applicationservice.updateCandidate(id, updateCandidateDto);
  // }
  @Put(':id')
  updateApplication(@Param('id') id: string, @Body() UpdateApplicationDto: UpdateApplicationDto): Promise<Application> {
    return this.applicationservice.updateCandidate(id, UpdateApplicationDto);
  }

}
