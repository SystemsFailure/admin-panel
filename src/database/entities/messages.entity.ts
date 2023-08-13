import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Messages {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    body: string;

    @Column()
    toId: string;

    @Column()
    fromId: string;

    @Column()
    isRead: boolean;
    
    @Column()
    atCreated: Date;
    
    @Column()
    atUpdated: Date;



    @ManyToOne(() => User, (user: User) => user.messages)
    user: User;
}