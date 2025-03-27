import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GameEntity } from './games.entity';
import { EventEntity } from './events.entity';

@Entity()
export class QuestionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => GameEntity, (game) => game.questions, { cascade: true })
  gameId: number;

  @ManyToMany(() => EventEntity, { cascade: true })
  @JoinTable()
  questions: EventEntity[];

  @Column('int')
  correctAnswerId: number;
}
