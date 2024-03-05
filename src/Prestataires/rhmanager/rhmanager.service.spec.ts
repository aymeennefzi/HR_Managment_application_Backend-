import { Test, TestingModule } from '@nestjs/testing';
import { RhmanagerService } from './rhmanager.service';

describe('RhmanagerService', () => {
  let service: RhmanagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RhmanagerService],
    }).compile();

    service = module.get<RhmanagerService>(RhmanagerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
