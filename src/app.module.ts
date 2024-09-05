import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ChatModule } from './chat/chat.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtMiddleware } from './auth/jwt.middleware';
import { ChatGateway } from './chat/chat.gateway';

const mongoHost = process.env.MONGO_HOST;
const mongoPort = process.env.MONGO_PORT;
const mongoDbName = process.env.MONGO_DB_NAME;
const mongoUser = process.env.MONGO_USER;
const mongoPassword = process.env.MONGO_PASSWORD;

let mongoUri = `mongodb://${mongoHost}:${mongoPort}/${mongoDbName}`;

if (mongoUser && mongoPassword) {
  mongoUri = `mongodb://${mongoUser}:${mongoPassword}@${mongoHost}:${mongoPort}/${mongoDbName}`;
}

@Module({
  imports: [
    MongooseModule.forRoot(mongoUri, {}),
    AuthModule,
    UserModule,
    ChatModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
  ],
  controllers: [],
  providers: [ChatGateway],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .exclude(
        { path: 'api/login', method: RequestMethod.POST },
        { path: 'api/register', method: RequestMethod.POST },
      )
      .forRoutes('*'); // Apply to all routes except excluded ones
  }
}
