import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { GameEntity } from './games.entity';

@Entity()
export class EventEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  eventName: string;

  @Column('varchar')
  pictureUrl: string;

  @ManyToMany(() => GameEntity, (game) => game.questions)
  games: GameEntity[];
}
