import { Injectable,  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from 'crypto';
import { ReadStream } from 'fs';
import { File } from 'src/database/entities/file.entity';
import { BodyFile } from 'src/interfaces/file.interface';
import { Repository, DataSource, UpdateResult, DeleteResult, InsertResult, Brackets } from 'typeorm';


@Injectable()
export class FileService {
    constructor(
        @InjectRepository(File)
        // Dependancy injection - repository instance User model by DataBase(Table)
        private messagesRepository: Repository<File>,
        private dataSource: DataSource
    ) {}

    async uploadFile(body: BodyFile) : Promise<void> {
        const {name, type, parent} = body;
    }

}