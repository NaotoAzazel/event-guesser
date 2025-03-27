import { Injectable } from '@nestjs/common';
import { GameResultEntity } from 'src/database/entities/game-results.entity';
import { CollectionService } from '../collection.service';

@Injectable()
export class GameResultsCollectionService extends CollectionService<GameResultEntity> {
  getRepositoryEntityTarget() {
    return GameResultEntity;
  }
}
