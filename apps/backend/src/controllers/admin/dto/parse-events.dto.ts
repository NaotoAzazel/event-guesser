import { IsInt, Max, Min, ValidateIf } from 'class-validator';

export class ParseEventsDto {
  @IsInt()
  @Min(1)
  @Max(12)
  month: number;

  @IsInt()
  @Min(1)
  @Max(31)
  @ValidateIf(
    (dto: ParseEventsDto) => {
      // The validator was added for checking existing entered day
      // 2024 was added as leap year
      const date = new Date(2024, dto.month, 0);

      return dto.day <= date.getDate();
    },
    {
      message: 'day is not correct',
    },
  )
  day: number;
}
