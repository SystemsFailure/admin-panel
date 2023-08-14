import {Module} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Messages } from 'src/database/entities/messages.entity';
import { MessagesController } from 'src/controllers/message.controller';
import { MessagesService } from 'src/services/messages.service';

@Module({
    imports: [TypeOrmModule.forFeature([Messages])],
    controllers: [MessagesController],
    providers: [MessagesService],
    // exports: [MessagesService],
})

export class MessageModule {};