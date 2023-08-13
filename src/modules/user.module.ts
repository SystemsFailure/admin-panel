import {Module} from '@nestjs/common';
import { UsersService } from 'src/services/users.service';
import { UsersController } from 'src/controllers/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
})

export class UserModule {};