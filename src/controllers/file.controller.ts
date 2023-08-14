import {Controller, Get, Post, HttpCode, Req, Request, Header, Delete, Put, UseFilters, Param, ParseIntPipe, UsePipes, ParseUUIDPipe, UseGuards, SetMetadata, UploadedFile} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/utils/filters/http.exception.filter';
import { Roles } from 'src/decorators/roles.decorator';
import {DeleteResult} from 'typeorm';
import { FileService } from 'src/services/file.service';

@Controller('files')
export class FileController {
    constructor(
        private messagesService: FileService
    ) {}


    @Post('upload')
    async upload(@UploadedFile() file: Express.Multer.File) : Promise<void> {
        console.log(file);
    }
}