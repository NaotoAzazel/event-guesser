import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { GameEntity } from './games.entity';
import { GameResultEntity } from './game-results.entity';

@Entity()
@Unique(['username', 'email'])
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  username: string;

  @Column('varchar')
  email: string;

  @Column('varchar')
  password: string;

  @ManyToMany(() => UserEntity, (user) => user.friends)
  @JoinTable()
  friends: UserEntity[];

  @ManyToMany(() => GameEntity, (game) => game.players)
  games: GameEntity[];

  @OneToMany(() => GameResultEntity, (game) => game.user)
  gameResults: GameResultEntity[];
}
