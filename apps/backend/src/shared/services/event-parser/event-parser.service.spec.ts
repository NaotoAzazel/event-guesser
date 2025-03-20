import { Test, TestingModule } from '@nestjs/testing';
import { EventParserService } from './event-parser.service';

describe('EventParserService', () => {
  let service: EventParserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventParserService],
    }).compile();

    service = module.get<EventParserService>(EventParserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
