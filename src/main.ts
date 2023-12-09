import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";
import * as cookieParser from "cookie-parser";

const start = async() => {
  try {
    const app = await NestFactory.create(AppModule);
    const PORT = process.env.PORT || 3030;

    app.enableCors();
    app.use(cookieParser());
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe());

    const config = new DocumentBuilder()
      .setTitle("Badiiyat")
      .setDescription("REST API")
      .setVersion("1.0.0")
      .addTag('NestJS, Postgres, Sequelize')
      .build()

    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('/api/docs', app, document)

    await app.listen(PORT, () => {
      console.log(`Server has started on ${PORT}-port!`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();