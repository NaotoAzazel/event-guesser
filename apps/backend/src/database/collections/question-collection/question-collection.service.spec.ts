import { Test, TestingModule } from '@nestjs/testing';
import { QuestionCollectionService } from './question-collection.service';

describe('QuestionCollectionService', () => {
  let service: QuestionCollectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuestionCollectionService],
    }).compile();

    service = module.get<QuestionCollectionService>(QuestionCollectionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
