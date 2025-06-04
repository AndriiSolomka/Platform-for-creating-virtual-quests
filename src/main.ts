import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ensureLogDirExists } from './utils/logger/logger.config';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as swaggerUi from 'swagger-ui-express';
import { DirNames } from './constants/enum/media/media';
import { join } from 'path';
import { swaggerSpec } from './swagger/swagger';

ensureLogDirExists();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.use(
    `${DirNames.UPLOAD}`,
    express.static(join(__dirname, '..', `${DirNames.UPLOAD}`)),
  );
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.setGlobalPrefix('api');
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap().catch((error) => {
  console.error('Error during app initialization:', error);
  process.exit(1);
});
