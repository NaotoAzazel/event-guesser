import { Injectable } from '@nestjs/common';
import { QuestionEntity } from 'src/database/entities/question.entity';
import { CollectionService } from '../collection.service';

@Injectable()
export class QuestionCollectionService extends CollectionService<QuestionEntity> {
  getRepositoryEntityTarget() {
    return QuestionEntity;
  }
}
