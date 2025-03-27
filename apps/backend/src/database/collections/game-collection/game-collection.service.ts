import { Injectable } from '@nestjs/common';
import { GameEntity } from 'src/database/entities/games.entity';
import { CollectionService } from '../collection.service';

@Injectable()
export class GameCollectionService extends CollectionService<GameEntity> {
  getRepositoryEntityTarget() {
    return GameEntity;
  }
}
