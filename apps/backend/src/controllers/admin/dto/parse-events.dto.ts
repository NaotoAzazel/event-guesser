import { IsInt, Max, Min } from 'class-validator';
import { MaxDayOfMonth } from '../decorators/max-day-of-month.decoraator';

export class ParseEventsDto {
  @IsInt()
  @Min(1)
  @Max(12)
  month: number;

  @IsInt()
  @Min(1)
  @Max(31)
  @MaxDayOfMonth({ message: 'Invalid day for the given month' })
  day: number;
}
