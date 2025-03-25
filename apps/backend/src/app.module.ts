import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { EventParserService } from './shared/services/event-parser/event-parser.service';
import { AdminController } from './controllers/admin/admin.controller';
import { UserService } from './shared/services/user/user.service';
import { UserController } from './controllers/user/user.controller';
import { UserModule } from './modules/user/user.module';
import { AuthService } from './shared/services/auth/auth.service';
import { AuthController } from './controllers/auth/auth.controller';
import { UserCollectionService } from './database/collections/user-collection/user-collection.service';
import { JwtService } from '@nestjs/jwt';
import { EventPicturesService } from './shared/services/event-pictures/event-pictures.service';
import { EventPicturesCollectionService } from './database/collections/event-pictures/event-pictures.service';
import { EventService } from './shared/services/event/event.service';
import { EventCollectionService } from './database/collections/event-collection/event-collection.service';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, UserModule],
  controllers: [AdminController, UserController, AuthController],
  providers: [
    EventParserService,
    UserService,
    AuthService,
    UserCollectionService,
    JwtService,
    EventPicturesService,
    EventPicturesCollectionService,
    EventService,
    EventCollectionService,
  ],
})
export class AppModule {}
