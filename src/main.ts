import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); //activa validaciones globales de los DTOs
  app.enableCors(); //Importante 👀habilita CORS para permitir solicitudes desde el frontend Angular
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap().catch((err) => console.error(err));
