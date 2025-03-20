import { Body, Controller, Post, UseGuards, UsePipes } from '@nestjs/common';
import { AdminGuard } from '../../shared/guards/admin/admin.guard';
import { ParseEventsDto } from './dto/parse-events.dto';

@UseGuards(AdminGuard)
@Controller('admin')
export class AdminController {
  @Post('parse-events')
  parseEvents(@Body() dto: ParseEventsDto): boolean {
    console.log(dto);
    return true;
  }
}
