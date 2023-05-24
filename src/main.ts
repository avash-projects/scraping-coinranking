import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const APP_PORT = process.env.PORT || 3000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(APP_PORT);
  Logger.log(`Application listening on port ${APP_PORT}`);
}

bootstrap();
