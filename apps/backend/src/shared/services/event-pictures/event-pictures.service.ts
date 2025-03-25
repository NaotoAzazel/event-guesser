import { Injectable } from '@nestjs/common';
import { EventPicturesCollectionService } from 'src/database/collections/event-pictures/event-pictures.service';
import { EventPictureEntity } from 'src/database/entities/event-picture.entity';

@Injectable()
export class EventPicturesService {
  constructor(
    private readonly eventPicturesCollection: EventPicturesCollectionService,
  ) {}

  async addImage(url: string): Promise<false | EventPictureEntity> {
    const image = new EventPictureEntity();
    image.pictureUrl = url;

    return await this.eventPicturesCollection.save(image);
  }

  async findByUrl(url: string) {
    return await this.eventPicturesCollection.findOne({ pictureUrl: url });
  }
}
