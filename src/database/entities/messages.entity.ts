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
    
    @Column('timestamp with time zone', { nullable: false, default: () => 'CURRENT_TIMESTAMP' })  
    atCreated: Date;
    
    @Column('timestamp with time zone', { nullable: false, default: () => 'CURRENT_TIMESTAMP' })  
    atUpdated: Date;



    @ManyToOne(() => User, (user: User) => user.messages)
    user: User;
}