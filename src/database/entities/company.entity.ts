import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Company {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    name: string;

    @Column()
    lacation: string;

    @Column( 'text', { array: true })
    staff: string [];

    @Column('text', { array: true })
    departments: string [];

    @Column()
    atCreated: Date;

    @Column()
    atUpdated: Date;

    @OneToMany(() => User, (user: User) => user.company)
    users: User[];
}