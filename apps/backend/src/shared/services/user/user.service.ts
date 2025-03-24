import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { hash } from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from 'src/database/entities/users.entity';
import { UserCollectionService } from 'src/database/collections/user-collection/user-collection.service';

@Injectable()
export class UserService {
  constructor(private readonly userCollection: UserCollectionService) {}

  async create(dto: CreateUserDto): Promise<Omit<UserEntity, 'password'>> {
    const user = await this.userCollection.findOne({ email: dto.email });

    if (user) throw new ConflictException('Email duplicated');

    const hashedPassword = await hash(dto.password, 10);

    const newUser = new UserEntity();
    newUser.email = dto.email;
    newUser.friends = [];
    newUser.gameResults = [];
    newUser.games = [];
    newUser.isAdmin = false;
    newUser.password = hashedPassword;
    newUser.username = dto.username;

    const isUserCreated = await this.userCollection.insert(newUser);
    if (!isUserCreated) {
      throw new InternalServerErrorException('Cant create user');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = newUser;
    return result;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return await this.userCollection.findOne({ email });
  }

  async findById(id: number): Promise<UserEntity | null> {
    return await this.userCollection.findOne({ id });
  }
}
