import { Test, TestingModule } from '@nestjs/testing';
import { EventPicturesService } from './event-pictures.service';

describe('EventPicturesService', () => {
  let service: EventPicturesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventPicturesService],
    }).compile();

    service = module.get<EventPicturesService>(EventPicturesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
