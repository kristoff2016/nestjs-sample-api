import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';

import "reflect-metadata";
import { AppModule } from './app.module';
import { LoggingInterceptor } from './logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new LoggingInterceptor());
  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Deliveroo API')
    .setDescription('Nestjs Sample to do REST API description')
    .setVersion('1.0')
    .addApiKey()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 200,
  });
  await app.listen(8181);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();