import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    transform: true,  // Automatically transform payload to the DTO class instance
    whitelist: true,  // Strip properties that are not part of the DTO
    forbidNonWhitelisted: true,  // Throw an error if non-whitelisted properties are found
    skipMissingProperties: false,  // Don't skip missing properties
  }));
  await app.listen(3000);
}
bootstrap();
