import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const options = new DocumentBuilder()
    .setTitle('Voucher Pool')
    .setDescription('Vaoucher Pool NestJs App')
    .setVersion('0.1.0')
    .addSecurity('token', {
      type: 'apiKey',
      scheme: 'api_key',
      in: 'header',
      name: 'auth-token',
    })
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api-docs', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: process.env.ENV === 'production',
      whitelist: true,
      transform: true,
    }),
  );

  await app
    .listen(process.env.NODE_PORT)
    .then(() =>
      Logger.log(
        `Server is listening on port: ${process.env.NODE_PORT}`,
        'NestApplication',
      ),
    );
}
bootstrap();
