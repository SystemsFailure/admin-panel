import { Injectable,  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
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
  private readonly users: UserInterface[] = [];

  createMany(users: UserInterface[]) {
    console.log(users);
  };

  async create(user: unknown) {
    console.log(user, 'end - user -----');
    await this.dataSource.createQueryBuilder()
      .insert()
      .into(User)
      .values([user])
      .execute();
    // this.users.push(user);
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
}