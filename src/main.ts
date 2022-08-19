import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
const MongoStore = require('connect-mongo');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.use(
    session({
      secret: process.env.COOKIE_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24,
      },
      store: MongoStore.create({
        mongoUrl: process.env.MONGO_CONNECTION_URL,
        collectionName: 'sessions',
      }),
    }),
  );

  app.enableCors({
    origin: ['http://rn.britsov.uk'],
    credentials: true,
  });

  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(process.env.PORT);
}
bootstrap();
