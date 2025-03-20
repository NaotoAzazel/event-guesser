import { DataSource } from 'typeorm';
import { UserEntity } from './entities/users.entity';
import { GameEntity } from './entities/games.entity';
import { GameResultEntity } from './entities/game-results.entity';
import { EventEntity } from './entities/events.entity';
import { DATA_SOURCE } from 'src/shared/constants/app.constants';

export const databaseProviders = [
  {
    provide: DATA_SOURCE,
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        url: process.env.DATABASE_URL,
        entities: [UserEntity, GameEntity, GameResultEntity, EventEntity],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
