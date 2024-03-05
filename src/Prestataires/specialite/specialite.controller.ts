import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { SpecialiteService } from './specialite.service';
import { CreateSpecialiteDto } from './dto/CreateSpecialiteDto';
import { Specialite } from 'src/schemas/specialite.schemas';

@Controller('specialite')
export class SpecialiteController {

    constructor(private readonly specialiteService: SpecialiteService) {}

    @Post()
    async createSpecialite(@Body() createSpecialiteDto: CreateSpecialiteDto): Promise<Specialite> {
        return this.specialiteService.createSpecialite(createSpecialiteDto);
      }

      @Get()
      async getAllSpecialites(): Promise<Specialite[]> {
        return this.specialiteService.getAllSpecialites();
      }
      @Get(':specialiteId')
      async getSpecialiteById(@Param('specialiteId') specialiteId: string): Promise<Specialite> {
        return this.specialiteService.findSpecialiteById(specialiteId);
      }
    @Put(':id')
      async updateSpecialite(@Param('id') specialiteId: string, @Body() createSpecialiteDto: CreateSpecialiteDto): Promise<Specialite> {
        return this.specialiteService.updateSpecialite(specialiteId, createSpecialiteDto);
      }

      @Delete(':id')
      async deleteSpecialite(@Param('id') specialiteId: string): Promise<Specialite> {
        return this.specialiteService.deleteSpecialite(specialiteId);
      }
}
