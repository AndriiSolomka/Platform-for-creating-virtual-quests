import {
  Controller,
  Post,
  Body,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { JwtAuthGuard } from '../common/guards/auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { MediaService } from '../media/media.service';
import { DirNames } from '../constants/enum/media/media';
import { FileSizeValidationPipe } from '../common/pipes/file-size-validation.pipe';
import { ParseOptionsPipe } from 'src/common/pipes/parse-options.pipe';

@UseGuards(JwtAuthGuard)
@Controller('question')
export class QuestionController {
  constructor(
    private readonly questionService: QuestionService,
    private readonly mediaService: MediaService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Body(ParseOptionsPipe) createQuestionDto: CreateQuestionDto,
    @UploadedFile(new FileSizeValidationPipe()) file?: Express.Multer.File,
  ) {
    const imageUrl =
      file && this.mediaService.saveFile(file, DirNames.QUESTIONS);
    return this.questionService.create(createQuestionDto, imageUrl);
  }
}
