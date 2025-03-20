import { Test, TestingModule } from '@nestjs/testing';
import { EventCollectionService } from './event-collection.service';

describe('EventCollectionService', () => {
  let service: EventCollectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventCollectionService],
    }).compile();

    service = module.get<EventCollectionService>(EventCollectionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
