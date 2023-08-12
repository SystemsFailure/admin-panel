import { Module, RequestMethod } from '@nestjs/common';
import { UserModule } from './modules/user.module';
import {NestModule, MiddlewareConsumer} from '@nestjs/common';
import { LoggerMiddlewareByControllers } from './middlewares/logger.middleware';

// Пока помни, что модули реализованны с помощью паттерна singlenton => можно создать
// всего один экземляр и использовать его между несколькими модулями. dont't forget
@Module({
  imports: [UserModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddlewareByControllers)
      .exclude(
        { path: 'users/create', method: RequestMethod.POST },
      )
      .forRoutes('users');
  }
};
