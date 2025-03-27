import { Test, TestingModule } from '@nestjs/testing';
import { GameResultsCollectionService } from './game-results-collection.service';

describe('GameResultsCollectionService', () => {
  let service: GameResultsCollectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameResultsCollectionService],
    }).compile();

    service = module.get<GameResultsCollectionService>(GameResultsCollectionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
