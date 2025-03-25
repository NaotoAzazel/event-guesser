import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';
import { ParseEventsDto } from '../dto/parse-events.dto';

export function MaxDayOfMonth(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'MaxDayOfMonth',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: number, args: ValidationArguments) {
          const obj = args.object as ParseEventsDto;
          const maxDaysInMonth = new Date(2024, obj.month, 0).getDate();
          return value >= 1 && value <= maxDaysInMonth;
        },
        defaultMessage(args: ValidationArguments) {
          const obj = args.object as ParseEventsDto;
          const maxDaysInMonth = new Date(2024, obj.month, 0).getDate();
          return `day must be between 1 and ${maxDaysInMonth} for month ${obj.month}`;
        },
      },
    });
  };
}
