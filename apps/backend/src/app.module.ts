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
import { GameController } from './controllers/game/game.controller';
import { GameService } from './shared/services/game/game.service';
import { GameCollectionService } from './database/collections/game-collection/game-collection.service';
import { GameResultsCollectionService } from './database/collections/game-results-collection/game-results-collection.service';
import { QuestionCollectionService } from './database/collections/question-collection/question-collection.service';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, UserModule],
  controllers: [
    AdminController,
    UserController,
    AuthController,
    GameController,
  ],
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
    GameService,
    GameCollectionService,
    GameResultsCollectionService,
    QuestionCollectionService,
  ],
})
export class AppModule {}
