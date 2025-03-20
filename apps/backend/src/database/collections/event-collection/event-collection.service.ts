import { Injectable } from '@nestjs/common';
import { CollectionService } from '../collection.service';
import { EventEntity } from '../../entities/events.entity';

@Injectable()
export class EventCollectionService extends CollectionService<EventEntity> {
  getRepositoryEntityTarget() {
    return EventEntity;
  }
}
