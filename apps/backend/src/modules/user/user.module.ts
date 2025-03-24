import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserController } from 'src/controllers/user/user.controller';
import { UserCollectionService } from 'src/database/collections/user-collection/user-collection.service';
import { DatabaseModule } from 'src/database/database.module';
import { UserService } from 'src/shared/services/user/user.service';

@Module({
  imports: [DatabaseModule],
  providers: [UserService, UserCollectionService, JwtService],
  controllers: [UserController],
})
export class UserModule {}
