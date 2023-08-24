import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, InsertResult, Repository } from "typeorm";
import { Task } from "src/database/entities/tasks.entity";

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task)
        // Dependancy injection - repository instance User model by DataBase(Table)
        private taskRepository: Repository<Task>,
        private dataSource: DataSource
    ) {};

    public async createTask(task: Task): Promise<InsertResult> {
        const rs: InsertResult = await this.dataSource.createQueryBuilder()
        .insert()
        .into(Task)
        .values([
            task
        ])
        .execute();

        return rs;
    };

    public async getTaskById(taskId: string): Promise<Task> {
        const task: Task = await this.dataSource
        .getRepository(Task)
        .createQueryBuilder('task')
        .where("task.id = :id", {id: taskId})
        .getOne();

        return task;
    };
}
