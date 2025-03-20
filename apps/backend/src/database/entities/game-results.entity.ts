import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { UserEntity } from './users.entity';
import { GameEntity } from './games.entity';

@Entity()
export class GameResultEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.gameResults)
  user: UserEntity;

  @ManyToOne(() => GameEntity, (game) => game.results)
  game: GameEntity;

  @Column('int')
  correctAnswers: number;
}
