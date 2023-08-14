import { Injectable,  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, UpdateResult, DeleteResult } from 'typeorm';
import UserInterface from '../interfaces/user.interface';
import { User } from 'src/database/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    // Dependancy injection - repository instance User model by DataBase(Table)
    private usersRepository: Repository<User>,
    private dataSource: DataSource
  ) {}

  async createMany(users: UserInterface[]) : Promise<void> {
    console.log(users);
  };

  async create(user: unknown) {
    console.log(user, 'end - user -----');
    await this.dataSource.createQueryBuilder()
      .insert()
      .into(User)
      .values([user])
      .execute();
  };

  async findAll(): Promise<User[]> {
    const users: User[] = await this.dataSource.getRepository(User).createQueryBuilder('user')
      .getMany();
    return users;
  };

  async findOne(id: string) : Promise<User> {
    const user = await this.dataSource
      .getRepository(User)
      .createQueryBuilder('user')
      .where("user.id = :id", {id: id})
      .getOne();

      return user;
  }

  async updateField(key: any, value: any, id: string) : Promise<UpdateResult> {
    const result: UpdateResult = await this.dataSource.createQueryBuilder()
      .update(User)
      .set({
        [key]: value
      })
      .where('id = :id', {id: id})
      .execute();

      return result;
  }


  async delete(id: string) : Promise<DeleteResult> {
    const result: DeleteResult = await this.dataSource.createQueryBuilder()
      .delete()
      .from(User)
      .where('id = :id', {id: id})
      .execute();

      return result;

  }
}