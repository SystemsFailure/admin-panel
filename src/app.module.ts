import { Module, RequestMethod } from '@nestjs/common';
import { UserModule } from './modules/user.module';
import {NestModule, MiddlewareConsumer} from '@nestjs/common';
import { LoggerMiddlewareByControllers } from './middlewares/logger.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './database/entities/user.entity';
import { Admin } from './database/entities/admin.entity';
import { Company } from './database/entities/company.entity';
import { Messages } from './database/entities/messages.entity';
import { MessageModule } from './modules/message.module';
import { FileModule } from './modules/file.module';
import { File } from './database/entities/file.entity';
import { MulterModule } from '@nestjs/platform-express';
import { Task } from './database/entities/tasks.entity';
import { TaskModule } from './modules/task.module';

// Пока помни, что модули реализованны с помощью паттерна singlenton => можно создать
// всего один экземляр и использовать его между несколькими модулями. dont't forget
@Module({
  imports: [
    UserModule,
    MessageModule,
    FileModule,
    TaskModule,
    MulterModule.register({dest: './uploads'}),


    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '31415',
      database: 'admin-panel-db',
      entities: [User, Admin, Company, Messages, File, Task],
      synchronize: true,
    })
    
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddlewareByControllers)
      .exclude(
        { path: 'users/create', method: RequestMethod.POST },
      )
      .forRoutes('users', 'messages');
  }
};
