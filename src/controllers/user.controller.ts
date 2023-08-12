import {Controller, Get, Post, HttpCode, Req, Request, Header, Delete, Put, UseFilters, Param, ParseIntPipe, UsePipes, UseGuards, SetMetadata} from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/role.guard';
import UserInterface from 'src/interfaces/user.interface';
import createUserSchema from 'src/joi.schemas/user.create.body.schema';
import { JoiValidationPipe } from 'src/pipes/joi.validation.pipe';
import { UsersService } from 'src/services/users.service';
import { HttpExceptionFilter } from 'src/utils/filters/http.exception.filter';

@Controller('users')
@UseGuards(RolesGuard)
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
    async get(@Req() request: Request): Promise<UserInterface[]> {
        // Для этих контроллеров нужно реализоваить типы, которые доступны для request объекта. Что бы linter мозги не парил
        // const limit = request?.body?.limit;
        const users: UserInterface[] = this.userServiece.findAll();
        return users;
    }

    @Get('findOne:id')
    @HttpCode(200)
    findOne(@Param('id', ParseIntPipe) id: number, @Req() request: Request): string {
        console.log('createUser', id);
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