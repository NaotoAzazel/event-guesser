import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  Unique,
  JoinTable,
} from 'typeorm';
import { GameEntity } from './games.entity';
import { EventPictureEntity } from './event-picture.entity';

@Entity()
@Unique(['eventName'])
export class EventEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  eventName: string;

  @ManyToMany(() => EventPictureEntity, (picture) => picture.events, {
    cascade: true,
  })
  @JoinTable()
  pictures: EventPictureEntity[];

  @ManyToMany(() => GameEntity, (game) => game.questions)
  games: GameEntity[];
}
