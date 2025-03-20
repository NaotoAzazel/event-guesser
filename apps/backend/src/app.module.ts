import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { EventParserService } from './shared/services/event-parser/event-parser.service';
import { AdminController } from './controllers/admin/admin.controller';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule],
  controllers: [AdminController],
  providers: [EventParserService],
})
export class AppModule {}
