import { NestFactory } from '@nestjs/core';
import { OrdersModule } from './orders.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(OrdersModule);
  const configService = app.get(ConfigService); // Remove quotes
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(configService.get('PORT') ?? 3000);
}
bootstrap();
