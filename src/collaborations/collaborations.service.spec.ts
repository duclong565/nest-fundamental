import { Test, TestingModule } from '@nestjs/testing';
import { CollaborationsService } from './collaborations.service';
import { CollaborationRepository } from './entity/collaborations.repository';

describe('CollaborationsService', () => {
  let service: CollaborationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CollaborationsService,
        { provide: CollaborationRepository, useValue: {} },
      ],
    }).compile();

    service = module.get<CollaborationsService>(CollaborationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
