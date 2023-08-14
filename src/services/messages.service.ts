import { Injectable,  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from 'crypto';
import { ReadStream } from 'fs';
import { Messages } from 'src/database/entities/messages.entity';
import { Repository, DataSource, UpdateResult, DeleteResult, InsertResult, Brackets } from 'typeorm';


@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Messages)
    // Dependancy injection - repository instance User model by DataBase(Table)
    private messagesRepository: Repository<Messages>,
    private dataSource: DataSource
  ) {}


  async create(message: Messages): Promise<InsertResult> {
    const rs: InsertResult = await this.dataSource.createQueryBuilder()
        .insert()
        .into(Messages)
        .values([
            message
        ])
        .execute();

    return rs;
  };

  async findAllByCommon(fromId: string, toId: string, skip: number, take: number): Promise<Messages[]> {
    const messages: Messages[] = await this.messagesRepository.find(
        {
            where: [
                {toId: toId, fromId: fromId},
                {toId: fromId, fromId: toId}
            ],
            order: {atCreated: 'DESC'},
            skip: skip,
            take: take,
        }
    )

    // const messages: Messages[] = await this.dataSource
    //     .getRepository(Messages)
    //     .createQueryBuilder('message')
        
        // .where('message.toId = :toId OR message.toId = :fromId', {toId: toId, fromId: fromId})
        // .andWhere('message.fromId = :toId OR message.toId = :fromId', {toId: toId, fromId: fromId})

        // .andWhere(
        //     new Brackets((qb) => {
        //         qb
        //         .where('message.toId = :toId', { toId: toId })
        //         .andWhere('message.fromId = :fromId', { fromId: fromId })
        //         .orWhere('message.toId = :fromId, message.fromId = :toId', { toId: toId, fromId: fromId })
        //     }),
        // )

        // .skip(skip)
        // .take(take)
        // .orderBy('message.atCreated', 'ASC')
        // .getMany()

    return messages
  };

  async delete(id: string): Promise<DeleteResult> {
    const rs: DeleteResult = await this.dataSource.createQueryBuilder()
      .delete()
      .from(Messages)
      .where('id = :id', {id: id})
      .execute();
    return rs;
  };


  async stream(id: UUID) : Promise<ReadStream> {
    const stream: ReadStream = await this.dataSource
    .getRepository(Messages)
    .createQueryBuilder("message")
    .where("message.id = :id", { id: id })
    .stream()

    return stream;
  };
}