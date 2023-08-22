import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Task {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    name: string;

    @Column()
    desctiption: string;

    @Column('timestamp with time zone', { nullable: false, default: () => 'CURRENT_TIMESTAMP' })  
    timeComplete: Date;

    @Column()
    completed: boolean;

    @Column()
    status: string;

    @Column()
    difficulty: string;
    
    @Column()
    Importance: number;

    @Column('timestamp with time zone', { nullable: false, default: () => 'CURRENT_TIMESTAMP' })  
    atCreated: Date;

    @Column('timestamp with time zone', { nullable: false, default: () => 'CURRENT_TIMESTAMP' })  
    atUpdated: Date;
}