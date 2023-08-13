import { Company } from "src/database/entities/company.entity";
import { Messages } from "src/database/entities/messages.entity";

export default interface UserInterface{
    readonly id?: string;
    avatarUrl: string;
    numberPhone: string;
    mail: string;
    name: string;
    lastname: string;
    password: string;
    age: number;
    role: string;
    isActive: boolean;
    isOnline: boolean;
    department: string;
    lastLogin: string;
    atCreated: Date;
    atUpdated: Date;
    messages: Messages[];
    company: Company;
}
