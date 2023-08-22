import {Controller, Get, Post, Param, UploadedFile, UseInterceptors, Body, Res, Delete} from '@nestjs/common';
import { FileService } from 'src/services/file.service';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import filenameMut from 'src/utils/files-utils/filename.mut';
import { BodyFile } from 'src/interfaces/file.interface';


import { Roles } from 'src/decorators/roles.decorator';
import { HttpExceptionFilter } from 'src/utils/filters/http.exception.filter';
import { Response } from 'express';
import { bodyGFiles } from 'src/interfaces/body.files.get.interface';

@Controller('files')
export class FileController {
    constructor(
        private fileService: FileService
    ) {}


    @Post('upload/:toId/:fromId')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './assets/uploads/files',
            filename: filenameMut
        })
    }))

    async upload(
                @UploadedFile() file: Express.Multer.File, 
                @Body() body: BodyFile,
                @Param('toId') toId : string,
                @Param('fromId') fromId : string
            ) : Promise<any> {
        await this.fileService.uploadFile({toId: toId, fromId: fromId}, file);
    }

    @Get('download/:id')
    async download(
            @Param('id') id : number,
            @Res({passthrough: true}) res: Response
        ) : Promise<any> {
        const { stream, mimeType } = await this.fileService.downloadFile(id);
        res.set({
            'Content-Type': mimeType
        })
        return stream;
    }

    @Get('getFile/:id')
    async getFile(@Param('id') id : number) : Promise<any> {
        return `request by get file with id: ${id}`
    }

    @Post('getFiles')
    async getFiles(@Body() body: bodyGFiles) : Promise<any> {
        return this.fileService.getFiles(body);
    };

    @Delete('delete/:id')
    async delete(@Param('id') id : number) : Promise<string> {
        return await this.fileService.deleteFile(id);
    };

}