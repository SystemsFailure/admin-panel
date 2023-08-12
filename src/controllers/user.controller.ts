import {Controller, Get, Post, HttpCode, Req, Request, Header, Delete, Put} from '@nestjs/common';
import UserInterface from 'src/interfaces/user.interface';
import { UsersService } from 'src/services/users.service';

@Controller('users')
export class UsersController {
    constructor(private userServiece: UsersService) {}
    @Post('create')
    @HttpCode(200)
    @Header('Cache-Control', 'none')
    async create(@Req() request: Request): Promise<string> {
        const user: any = request.body;
        await this.userServiece.create(user);
        return user;
    }
    @Get()
    @HttpCode(200)
    async get(@Req() request: Request): Promise<UserInterface[]> {
        // Для этих контроллеров нужно реализоваить типы, которые доступны для request объекта. Что бы linter мозги не парил
        // const limit = request?.body?.limit;
        const users: UserInterface[] = this.userServiece.findAll();
        return users;
    }

    @Get('findOne')
    @HttpCode(200)
    findOne(@Req() request: Request): string {
        console.log('createUser');
        return 'find one user is successful';
    };

    @Get('findAll')
    @HttpCode(200)
    async findAll(@Req() request: Request): Promise<UserInterface[]> {
        // Для этих контроллеров нужно реализоваить типы, которые доступны для request объекта. Что бы linter мозги не парил
        // const limit = request?.body?.limit;
        const users: UserInterface[] = this.userServiece.findAll();
        return users;
    };

    @Put()
    @HttpCode(200)
    update(@Req() request: Request): string {
        console.log('createUser');
        return 'Update user is successful';
    };
    

    @Delete()
    @HttpCode(200)
    remove(@Req() request: Request): string {
        console.log('createUser');
        return 'remove user is successful';
    }
}