import {Module} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileController } from 'src/controllers/file.controller';
import { File } from 'src/database/entities/file.entity';
import { FileService } from 'src/services/file.service';

@Module({
    imports: [TypeOrmModule.forFeature([File])],
    controllers: [FileController],
    providers: [FileService],
    // exports: [MessagesService],
})

export class FileModule {};