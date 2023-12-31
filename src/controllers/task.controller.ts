import { Body, Controller, Get, Param, Post, Request } from "@nestjs/common";
import { request } from "http";
import { Task } from "src/database/entities/tasks.entity";
import { TaskService } from "src/services/task.service";
import { InsertResult } from "typeorm";

@Controller('tasks')
export class TaskController {
    constructor(private userServiece: TaskService) {};

    @Post('create')
    public async create(@Request() request: Request, @Body() body: Task) : Promise<InsertResult> {
        const data: Task = body;
        const result:InsertResult = await this.userServiece.createTask(data);
        return result;
    };

    @Get('getTask/:id')
    async getTask(
        @Param('id') id: string,
    ): Promise<Task> {
        const task: Task = await this.userServiece.getTaskById(id);
        return task;
    };

    @Get('getTasksByUserId/:id')
    public async getTasksByUserId(
        @Param('id') id: string,
    ) : Promise<Task[]> {
        const tasks: Task[] = await this.userServiece.getAllUsersByTaskId(id);
        return tasks;
    }
}