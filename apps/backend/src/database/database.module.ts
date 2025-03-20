import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { EventCollectionService } from './collections/event-collection/event-collection.service';

@Module({
  providers: [...databaseProviders, EventCollectionService],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
