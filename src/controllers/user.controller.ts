import {Controller, Get, Post, HttpCode, Req, Request, Header, Delete, Put, UseFilters, Param, ParseIntPipe, UsePipes, ParseUUIDPipe, UseGuards, SetMetadata, Body} from '@nestjs/common';
import { User } from 'src/database/entities/user.entity';
import { Roles } from 'src/decorators/roles.decorator';
import createUserSchema from 'src/joi.schemas/user.create.body.schema';
import { JoiValidationPipe } from 'src/pipes/joi.validation.pipe';
import { UsersService } from 'src/services/users.service';
import { HttpExceptionFilter } from 'src/utils/filters/http.exception.filter';
import {DeleteResult} from 'typeorm';

import { RolesGuard } from 'src/guards/role.guard';
import UserInterface from 'src/interfaces/user.interface';

@Controller('users')
// @UseGuards(RolesGuard)
export class UsersController {
    constructor(private userServiece: UsersService) {}

    // @Header('Cache-Control', 'none')
    // @HttpCode(200)
    // @SetMetadata('roles', ['user'])

    @Post('create')
    @Roles('user')
    @UseFilters(new HttpExceptionFilter()) // Здесь используется кастомный фильтр HttpExceptionFilter для данного маршрута
    @UsePipes(new JoiValidationPipe(createUserSchema)) // Здесь используется кастомный канал валидации, в который 1 параметром передается joi схема, для правильной валидации тела запроса
    async create(@Req() request: Request): Promise<string> {
        const user: any = request.body;
        await this.userServiece.create(user);
        return user;
    }

    @Get()
    @HttpCode(200)
    async get(@Req() request: Request): Promise<User[]> {
        // Для этих контроллеров нужно реализоваить типы, которые доступны для request объекта. Что бы linter мозги не парил
        // const limit = request?.body?.limit;
        const users: User[] = await this.userServiece.findAll();
        return users;
    }

    @Get('findOne/:id')
    @HttpCode(200)
    async findOne(@Param('id', ParseUUIDPipe) id: string, @Req() request: Request): Promise<User> {
        const user: User = await this.userServiece.findOne(id);
        return user;
    };

    @Get('findAll')
    @HttpCode(200)
    async findAll(@Req() request: Request): Promise<User[]> {
        // Для этих контроллеров нужно реализоваить типы, которые доступны для request объекта. Что бы linter мозги не парил
        // const limit = request?.body?.limit;
        const users: User[] = await this.userServiece.findAll();
        return users;
    };

    @Put('update/:id')
    @HttpCode(200)
    async update(@Param('id', ParseUUIDPipe) id: string, @Req() request: Request, @Body() body: any): Promise<void> {
        const { key, value } = body;
        const rs = await this.userServiece.updateField(key, value, id);
        console.log('update field name is ' + rs);
    };
    

    @Delete('delete/:id')
    @HttpCode(200)
    async remove(@Param('id', ParseUUIDPipe) id: string, @Req() request: Request): Promise<DeleteResult> {
        const rs = await this.userServiece.delete(id);
        return rs;
    };

    @Put('update-online/:id')
    @HttpCode(200)
    async updateOnline(@Param('id', ParseUUIDPipe) id: string, @Body() body: any): Promise<any> {
        const { value } = body;
        const rs = await this.userServiece.updateField('isOnline', value, id);
        // Здесь с помощью sockets нужно обновилять на клиенте данные о пользователе (запросить новые данные из бд, и перерендерить только необходимое)
        return rs;
    };

    @Put('add-task/:id')
    @HttpCode(200)
    async addTask(@Param('id', ParseUUIDPipe) id: string, @Body() body: any ) : Promise<boolean> {
        const {taskId} = body;
        await this.userServiece.addTask(id, taskId);
        return true;
    }
}