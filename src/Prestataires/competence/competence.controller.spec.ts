import { Test, TestingModule } from '@nestjs/testing';
import { CompetenceController } from './competence.controller';

describe('CompetenceController', () => {
  let controller: CompetenceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompetenceController],
    }).compile();

    controller = module.get<CompetenceController>(CompetenceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
