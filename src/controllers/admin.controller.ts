import { Body, Controller, Get, HttpStatus, Post, UseFilters } from "@nestjs/common";
import { HttpExceptionFilter } from "src/utils/filters/http.exception.filter";


@Controller('admin')
export class AdminController {
    constructor() {};

    @UseFilters(new HttpExceptionFilter()) // Здесь используется кастомный фильтр HttpExceptionFilter для данного маршрута
    @Post('create')
    async create(@Body() body: Body) : Promise<void> {
        
    }

}