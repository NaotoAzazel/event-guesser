import { Test, TestingModule } from '@nestjs/testing';
import { GameCollectionService } from './game-collection.service';

describe('GameCollectionService', () => {
  let service: GameCollectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameCollectionService],
    }).compile();

    service = module.get<GameCollectionService>(GameCollectionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
