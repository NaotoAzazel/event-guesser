import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { EventCollectionService } from './collections/event-collection/event-collection.service';
import { UserCollectionService } from './collections/user-collection/user-collection.service';
import { DATA_SOURCE } from 'src/shared/constants/app.constants';
import { EventPicturesCollectionService } from './collections/event-pictures/event-pictures.service';
import { GameCollectionService } from './collections/game-collection/game-collection.service';
import { GameResultsCollectionService } from './collections/game-results-collection/game-results-collection.service';
import { QuestionCollectionService } from './collections/question-collection/question-collection.service';

@Module({
  providers: [
    ...databaseProviders,
    EventCollectionService,
    UserCollectionService,
    EventPicturesCollectionService,
    GameCollectionService,
    GameResultsCollectionService,
    QuestionCollectionService,
  ],
  exports: [...databaseProviders, DATA_SOURCE],
})
export class DatabaseModule {}
