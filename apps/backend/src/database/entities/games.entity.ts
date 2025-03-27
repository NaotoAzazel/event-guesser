import { GameStatuses } from 'src/shared/enums/game-statuses.enum';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { UserEntity } from './users.entity';
import { GameResultEntity } from './game-results.entity';
import { QuestionEntity } from './question.entity';

@Entity()
export class GameEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: GameStatuses })
  status: GameStatuses;

  @ManyToMany(() => UserEntity, (user) => user.games)
  @JoinTable()
  players: UserEntity[];

  @OneToMany(() => QuestionEntity, (question) => question.gameId)
  questions: QuestionEntity[];

  @ManyToMany(() => GameResultEntity, (result) => result.game)
  results: GameResultEntity[];
}
