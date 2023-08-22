import {Controller, Get, Post, HttpCode, Req, Request, Header, Delete, Put, UseFilters, Param, ParseIntPipe, UsePipes, ParseUUIDPipe, UseGuards, SetMetadata, Body} from '@nestjs/common';
import { MessagesService } from 'src/services/messages.service';
import { HttpExceptionFilter } from 'src/utils/filters/http.exception.filter';
import { Roles } from 'src/decorators/roles.decorator';
import { Messages } from 'src/database/entities/messages.entity';
import {DeleteResult} from 'typeorm';
import UpdateFieldType from 'src/interfaces/bodys.requests/messages.update.field.type';

@Controller('messages')
export class MessagesController {
    constructor(
        private messagesService: MessagesService
    ) {}

    @Post('create')
    @HttpCode(200)
    @Roles('user')
    @UseFilters(new HttpExceptionFilter())
    async create(@Req() request: Request): Promise<string> {
        const message: any = request.body;
        await this.messagesService.create(message);
        return message;
    };

    @Get('getAllByCommon/:toId/:fromId/:take/:skip')
    @HttpCode(200)
    @Roles('user')
    @UseFilters(new HttpExceptionFilter())
    async getAllByCommon(
            @Param('toId') toId : string, 
            @Param('fromId') fromId: string,
            @Param('take') take: number,
            @Param('skip') skip: number,
            @Req() request: Request,
        ): Promise<Messages[]> 
        {
            // Code here...
            return await this.messagesService.findAllByCommon(fromId, toId, skip, take);
        }

    @Delete('delete/:id')
    @HttpCode(200)
    @Roles('user')
    @UseFilters(new HttpExceptionFilter())
    async delete(
        @Param('id', ParseUUIDPipe) id: string,
        @Req() request: Request,
    ) : Promise<DeleteResult>
    {
        return await this.messagesService.delete(id);
    }

    @Put('update-field/:id')
    @HttpCode(200)
    // @Roles('user')
    @UseFilters(new HttpExceptionFilter())
    async updateField(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() body: UpdateFieldType,
        @Req() request: Request,
    ) : Promise<any>
    {
        const { field, value } =  body;
        return await this.messagesService.updateField(id, field, value);
    };


}