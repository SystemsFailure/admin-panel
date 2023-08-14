import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Company } from './company.entity';
import { Messages } from './messages.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    avatarUrl: string;

    @Column()
    numberPhone: string;

    @Column()
    mail: string;

    @Column()
    name: string;

    @Column()
    lastname: string;

    @Column()
    password: string;

    @Column()
    age: number;

    @Column()
    role: string;

    @Column({ default: true })
    isActive: boolean;

    @Column({default: false})
    isOnline: boolean;

    @Column()
    department: string;

    @Column()
    lastLogin: string;

    @Column('timestamp with time zone', { nullable: false, default: () => 'CURRENT_TIMESTAMP' })  
    atCreated: Date;

    @Column('timestamp with time zone', { nullable: false, default: () => 'CURRENT_TIMESTAMP' })  
    atUpdated: Date;


    @OneToMany(() => Messages, (message: Messages) => message.user)
    messages: Messages[];


    @ManyToOne(() => Company, (company: Company) => company.users)
    company: Company;
}