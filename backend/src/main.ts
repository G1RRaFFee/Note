import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import CookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(CookieParser());
  app.setGlobalPrefix('api');
  app.enableCors({ credentials: true, origin: process.env.CLIENT_URL });
  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
