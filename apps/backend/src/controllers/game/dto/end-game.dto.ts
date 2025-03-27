import { ArrayNotEmpty, IsArray, IsNumber } from 'class-validator';

export class EndGameDto {
  @IsNumber()
  gameId: number;

  @IsArray()
  @ArrayNotEmpty()
  players: number[];

  @IsNumber()
  correctAnswers: number;
}
