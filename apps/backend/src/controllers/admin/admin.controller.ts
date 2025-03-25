import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AdminGuard } from '../../shared/guards/admin/admin.guard';
import { ParseEventsDto } from './dto/parse-events.dto';
import { EventParserService } from 'src/shared/services/event-parser/event-parser.service';
import { EventService } from 'src/shared/services/event/event.service';
import { ApiResponse } from 'src/shared/models/api-response.interface';

@UseGuards(AdminGuard)
@Controller('admin')
export class AdminController {
  constructor(
    private readonly eventParserService: EventParserService,
    private readonly eventService: EventService,
  ) {}

  @UseGuards(AdminGuard)
  @Post('parse')
  async parseEvents(@Body() dto: ParseEventsDto): Promise<ApiResponse> {
    const parsedEvents = await this.eventParserService.getEvent(
      String(dto.day),
      String(dto.month),
    );

    const prevAddedEvents: string[] = [];

    for (const event of parsedEvents) {
      const isEventExists = await this.eventService.findByTitle(event.title);
      if (isEventExists) {
        prevAddedEvents.push(event.title);
        continue;
      }

      const createdEvent = await this.eventService.createEvent(event.title);
      if (!createdEvent) {
        continue;
      }

      await this.eventService.addPicturesToEvent(
        createdEvent.id,
        event.pictures,
      );
    }

    if (parsedEvents.length === prevAddedEvents.length) {
      return { message: 'All events from that day has already parsed' };
    }

    const response: ApiResponse = {
      message: 'Events parsed',
    };

    if (prevAddedEvents.length) {
      response.error = `Skipped events: ${prevAddedEvents.join('\n')}`;
    }

    return response;
  }
}
