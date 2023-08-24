import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, InsertResult, Repository } from "typeorm";
import { Task } from "src/database/entities/tasks.entity";
import { User } from "src/database/entities/user.entity";
import { UsersService } from "./users.service";

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task)
        // Dependancy injection - repository instance User model by DataBase(Table)
        private taskRepository: Repository<Task>,
        private dataSource: DataSource
    ) {};

    public async createTask(task: Task): Promise<InsertResult> {
        let result: InsertResult;
        try {
            result = await this.dataSource.createQueryBuilder()
                .insert()
                .into(Task)
                .values([
                    task
                ])
                .execute();
        } catch (error) {
            console.error(error);
        }
        return result;
    };

    public async getTaskById(taskId: string): Promise<Task> {
        let task: Task;
        try {
            task = await this.dataSource
                .getRepository(Task)
                .createQueryBuilder('task')
                .where("task.id = :id", {id: taskId})
                .getOne();
        } catch (error) {
            console.error(error);
        }

        return task;
    };

    public async getAllUsersByTaskId(userId: any) : Promise<Task[]> {
        let arrayTasks: Task[];
        // getting all tasks with userid === userId of function argument
        const user: User = await this.dataSource.getRepository(User).findOne({where: {id: userId}, relations: ['tasks']})
        arrayTasks = user.tasks;
        return arrayTasks;
    }
}
