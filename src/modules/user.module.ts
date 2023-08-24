import {Module} from '@nestjs/common';
import { UsersService } from 'src/services/users.service';
import { UsersController } from 'src/controllers/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { TaskService } from 'src/services/task.service';
import { Task } from 'src/database/entities/tasks.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User, Task])],
    controllers: [UsersController],
    providers: [UsersService, TaskService],
    exports: [UsersService],
})

export class UserModule {};