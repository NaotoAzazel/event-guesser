import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/database/entities/users.entity';
import { CollectionService } from '../collection.service';

@Injectable()
export class UserCollectionService extends CollectionService<UserEntity> {
  getRepositoryEntityTarget() {
    return UserEntity;
  }
}
