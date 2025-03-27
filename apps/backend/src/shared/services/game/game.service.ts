import { Injectable } from '@nestjs/common';
import { EndGameDto } from 'src/controllers/game/dto/end-game.dto';
import { EventCollectionService } from 'src/database/collections/event-collection/event-collection.service';
import { GameCollectionService } from 'src/database/collections/game-collection/game-collection.service';
import { GameResultsCollectionService } from 'src/database/collections/game-results-collection/game-results-collection.service';
import { QuestionCollectionService } from 'src/database/collections/question-collection/question-collection.service';
import { GameResultEntity } from 'src/database/entities/game-results.entity';
import { GameEntity } from 'src/database/entities/games.entity';
import { QuestionEntity } from 'src/database/entities/question.entity';
import { UserEntity } from 'src/database/entities/users.entity';
import { GameStatuses } from 'src/shared/enums/game-statuses.enum';
import { GenerateQuestionsParams } from './models/function-params.interface';

@Injectable()
export class GameService {
  constructor(
    private readonly gameCollection: GameCollectionService,
    private readonly gameResultsCollection: GameResultsCollectionService,
    private readonly eventCollection: EventCollectionService,
    private readonly questionCollection: QuestionCollectionService,
  ) {}

  async createGame(userId: number): Promise<GameEntity> {
    const game = new GameEntity();
    game.players = [{ id: userId } as UserEntity];
    game.status = GameStatuses.IN_PROGRESS;

    const savedGameWithoutQuestions = await this.gameCollection.save(game);

    if (!savedGameWithoutQuestions) {
      throw new Error('Cant create game');
    }

    const questions = await this.generateQuestions({
      gameId: savedGameWithoutQuestions.id,
      questionsCount: 10,
      questionsInQuestion: 4,
    });
    savedGameWithoutQuestions.questions = questions;

    const gameWithQuestions = await this.gameCollection.save(
      savedGameWithoutQuestions,
    );

    if (!gameWithQuestions) {
      throw new Error('Cant save questions to game');
    }

    return gameWithQuestions;
  }

  async endGame(dto: EndGameDto, userId: number): Promise<GameResultEntity> {
    if (!dto.players.includes(userId)) {
      throw new Error('You cant end this game');
    }

    const game = await this.gameCollection.findOne({ id: dto.gameId });
    if (!game) {
      throw new Error('Game does not exists');
    }

    if (game.status === GameStatuses.COMPLETED) {
      throw new Error('This game already completed');
    }

    await this.gameCollection.update(dto.gameId, {
      status: GameStatuses.COMPLETED,
    });

    const gameResults = new GameResultEntity();
    gameResults.correctAnswers = dto.correctAnswers;
    gameResults.game = { id: dto.gameId } as GameEntity;
    gameResults.user = { id: userId } as UserEntity;

    const savedGameResults = await this.gameResultsCollection.save(gameResults);
    if (!savedGameResults) {
      throw new Error('Cant save game results');
    }

    return savedGameResults;
  }

  private async generateQuestions({
    gameId,
    questionsCount,
    questionsInQuestion,
  }: GenerateQuestionsParams): Promise<QuestionEntity[]> {
    const questions: QuestionEntity[] = [];

    for (let i = 0; i < questionsCount; i++) {
      const randomQuestions =
        await this.eventCollection.getRandomQuestions(questionsInQuestion);
      const correctAnswer =
        randomQuestions[Math.floor(Math.random() * randomQuestions.length)];

      const question = new QuestionEntity();
      question.gameId = gameId;
      question.questions = randomQuestions;
      question.correctAnswerId = correctAnswer.id;

      const savedQuestion = await this.questionCollection.save(question);

      if (!savedQuestion) {
        await this.gameCollection.update(gameId, {
          status: GameStatuses.FAILED,
        });
        throw new Error(
          'Cant save quetion to game, updated game status to failed',
        );
      }

      questions.push(savedQuestion);
    }

    return questions;
  }
}
