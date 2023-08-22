import { Injectable, StreamableFile,  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from 'crypto';
// import { ReadStream } from 'fs';
import {createReadStream, unlink} from 'fs';
import { extname } from 'path';
import { File } from 'src/database/entities/file.entity';
import { bodyGFiles } from 'src/interfaces/body.files.get.interface';
import { BodyFile } from 'src/interfaces/file.interface';
import { Repository, DataSource, UpdateResult, DeleteResult, InsertResult, Brackets } from 'typeorm';
import { ReadStream } from 'typeorm/platform/PlatformTools';


@Injectable()
export class FileService {
    constructor(
        @InjectRepository(File)
        // Dependancy injection - repository instance User model by DataBase(Table)
        private fileRepository: Repository<File>,
        private dataSource: DataSource
    ) {}

    async uploadFile(body: BodyFile, file: Express.Multer.File) : Promise<void> {
        console.log(file);
        const {filename, destination, path} = file;
        const {fromId, toId} = body;
        await this.fileRepository.insert({
            name: filename,
            path: destination + '/' + filename,
            toId: toId,
            fromId: fromId,
            size: file.size,
            ext: extname(file.originalname),
            mimeType: file.mimetype,
        })
    };

    async downloadFile(id: number) : Promise<any> {
        try {
            const file: File = await this.fileRepository.findOne({where : {id: id}});
    
            if(file) {
                const file_ : ReadStream = createReadStream(file?.path)
                return {
                    stream: new StreamableFile(file_),
                    mimeType: file.mimeType,
                };
            } else {
                return;
            }
        } catch (error) {
            throw new Error(error);            
        }
    };

    async searchFile(...params) : Promise<void> {
        const [name, toId, fromId] = params;
        console.log(name, toId, fromId);
    };

    async deleteFile( id: number ) : Promise<string> {
        let result_: string = undefined;
        if(id) {
            const file : File = await this.fileRepository.findOne({where: {id: id}});
            if(file) {
                const result: DeleteResult = await this.fileRepository.delete(id);
                if(result.affected === 1) {
    
                    unlink(`${file.path}`, (error) => {
                        if (error && error.code === 'ENOENT') {
                            console.log('So file not found in directory file system');
                            return;
                        } else {
                            result_ = 'file deleted successfully from database and file system';
                        }
                    })
    
                }
            }
        }

        return result_;
    };

    async getFiles( body: bodyGFiles ) : Promise<File[]> {
        const {sort} = body;
        if(sort === 'name') {
            return await this.dataSource.getRepository(File).createQueryBuilder('file').orderBy('name', 'ASC')
            .getMany();
        }
        if(sort === 'size') {
            return await this.dataSource.getRepository(File).createQueryBuilder('file').orderBy('size', 'ASC')
            .getMany();
        }
        if(sort === 'date') {
            return await this.dataSource.getRepository(File).createQueryBuilder('file').orderBy('atCreated', 'ASC')
            .getMany();
        }
    };

}