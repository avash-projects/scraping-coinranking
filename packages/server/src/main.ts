import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const APP_PORT = process.env.PORT || 3000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: "*"
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(APP_PORT);
  Logger.log(`Application listening on port ${APP_PORT}`);
}

bootstrap();
