import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Competence, CompetenceSchema } from 'src/schemas/competence.schemas';
import { CompetenceController } from './competence.controller';
import { CompetenceService } from './competence.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Competence.name, schema: CompetenceSchema },
            
           
          ])],
        controllers: [CompetenceController],
        providers: [CompetenceService]
})
export class CompetenceModule {}
