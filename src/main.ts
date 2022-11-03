import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInspector } from './transform.inspector';
import {Logger} from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInspector())
  const port = 3000;
  await app.listen(3000);
  Logger.log(`Application run on port ${port}`)
}
bootstrap();
