import { Injectable, NotFoundException } from '@nestjs/common';
import { EventCollectionService } from 'src/database/collections/event-collection/event-collection.service';
import { EventEntity } from 'src/database/entities/events.entity';
import { EventPicturesService } from '../event-pictures/event-pictures.service';

@Injectable()
export class EventService {
  constructor(
    private readonly eventCollection: EventCollectionService,
    private readonly eventPicturesService: EventPicturesService,
  ) {}

  async createEvent(eventName: string): Promise<false | EventEntity> {
    const newEvent = new EventEntity();
    newEvent.eventName = eventName;
    newEvent.pictures = [];
    newEvent.games = [];

    return await this.eventCollection.save(newEvent);
  }

  async addPicturesToEvent(
    eventId: number,
    pictureUrls: string[],
  ): Promise<boolean | EventEntity> {
    const event = await this.eventCollection.findOne(
      {
        id: eventId,
      },
      { pictures: true },
    );

    if (!event) {
      throw new NotFoundException(`Event with ID ${eventId} not found`);
    }

    for (const url of pictureUrls) {
      const picture = await this.eventPicturesService.addImage(url);

      if (!picture) {
        console.warn('Image already in DB', url);
        continue;
      }

      if (!event.pictures.some((p) => p.id === picture.id)) {
        event.pictures.push(picture);
      }
    }

    return await this.eventCollection.save(event);
  }

  async findByTitle(title: string): Promise<EventEntity | null> {
    return await this.eventCollection.findOne({ eventName: title });
  }
}
