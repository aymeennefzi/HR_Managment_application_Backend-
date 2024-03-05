import { Test, TestingModule } from '@nestjs/testing';
import { RhmanagerController } from './rhmanager.controller';

describe('RhmanagerController', () => {
  let controller: RhmanagerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RhmanagerController],
    }).compile();

    controller = module.get<RhmanagerController>(RhmanagerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
