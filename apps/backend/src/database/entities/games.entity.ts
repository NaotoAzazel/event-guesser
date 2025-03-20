import { GameStatuses } from 'src/shared/enums/game-statuses.enum';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { UserEntity } from './users.entity';
import { EventEntity } from './events.entity';
import { GameResultEntity } from './game-results.entity';

@Entity()
export class GameEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: GameStatuses })
  status: GameStatuses;

  @ManyToMany(() => UserEntity, (user) => user.games)
  players: UserEntity[];

  @ManyToMany(() => EventEntity, (event) => event.games)
  questions: EventEntity[];

  @ManyToMany(() => GameResultEntity, (result) => result.game)
  results: GameResultEntity[];
}
