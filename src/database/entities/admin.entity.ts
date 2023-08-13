import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Admin {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    avatarUrl: string;

    @Column()
    adminToken: string;

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
    ownDepartment: string;

    @Column()
    lastLogin: string;

    @Column()
    atCreated: Date;

    @Column()
    atUpdated: Date;
}