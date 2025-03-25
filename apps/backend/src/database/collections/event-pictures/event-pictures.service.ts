import { Injectable } from '@nestjs/common';
import { EventPictureEntity } from 'src/database/entities/event-picture.entity';
import { CollectionService } from '../collection.service';

@Injectable()
export class EventPicturesCollectionService extends CollectionService<EventPictureEntity> {
  getRepositoryEntityTarget() {
    return EventPictureEntity;
  }
}
