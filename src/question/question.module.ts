import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { QuestionRepository } from './question.repository';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MediaService } from 'src/media/media.service';

@Module({
  imports: [PrismaModule],
  controllers: [QuestionController],
  providers: [QuestionService, QuestionRepository, MediaService],
})
export class QuestionModule {}
