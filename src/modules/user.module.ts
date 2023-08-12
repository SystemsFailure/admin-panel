import {Module} from '@nestjs/common';
import { UsersService } from 'src/services/users.service';
import { UsersController } from 'src/controllers/user.controller';


@Module({
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
})

export class UserModule {};