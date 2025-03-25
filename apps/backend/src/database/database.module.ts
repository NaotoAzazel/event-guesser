import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { EventCollectionService } from './collections/event-collection/event-collection.service';
import { UserCollectionService } from './collections/user-collection/user-collection.service';
import { DATA_SOURCE } from 'src/shared/constants/app.constants';
import { EventPicturesCollectionService } from './collections/event-pictures/event-pictures.service';

@Module({
  providers: [
    ...databaseProviders,
    EventCollectionService,
    UserCollectionService,
    EventPicturesCollectionService,
  ],
  exports: [...databaseProviders, DATA_SOURCE],
})
export class DatabaseModule {}
