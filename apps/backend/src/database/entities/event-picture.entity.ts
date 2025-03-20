import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { EventEntity } from './events.entity';

@Entity()
@Unique(['pictureUrl'])
export class EventPictureEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  pictureUrl: string;

  @ManyToMany(() => EventEntity, (event) => event.pictures)
  events: EventEntity[];
}
