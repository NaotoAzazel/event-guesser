import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthenticatedUser } from 'src/shared/decorators/authenticated-user/authenticated-user.decorator';
import { JwtGuard } from 'src/shared/guards/jwt/jwt.guard';
import { JwtPayload } from 'src/shared/models/jwt-payload.interface';
import { GameService } from 'src/shared/services/game/game.service';
import { EndGameDto } from './dto/end-game.dto';
import { ApiResponse } from 'src/shared/models/api-response.interface';
import { GameEntity } from 'src/database/entities/games.entity';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @UseGuards(JwtGuard)
  @Post('create')
  async createGame(
    @AuthenticatedUser() user: JwtPayload,
  ): Promise<ApiResponse<GameEntity>> {
    try {
      const createdGame = await this.gameService.createGame(user.userId);
      return {
        message: 'Game successfully created',
        data: createdGame,
      };
    } catch (error) {
      if (error instanceof Error) {
        return {
          message: 'Cant create game',
          error: error.message,
        };
      }

      return {
        message: 'Cant create game',
        error: 'Unknown error',
      };
    }
  }

  @UseGuards(JwtGuard)
  @Post('end')
  async endGame(
    @Body() gameDto: EndGameDto,
    @AuthenticatedUser() user: JwtPayload,
  ): Promise<ApiResponse<GameEntity>> {
    try {
      await this.gameService.endGame(gameDto, user.userId);
      return {
        message: 'Game successfully ended',
      };
    } catch (error) {
      if (error instanceof Error) {
        return {
          message: 'Cant end game',
          error: error.message,
        };
      }

      return {
        message: 'Cant end game',
        error: 'Unknown error',
      };
    }
  }
}
