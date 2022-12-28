import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {IUsers} from "../interfaces/IUsers";

@Entity({name: 'users'})
export class Users implements IUsers {
    @PrimaryGeneratedColumn({ type: "int" })
    id: number = 0

    @Column({ type: "varchar" })
    username: string;

    @Column({ type: "varchar" })
    mail: string;

    @Column({ type: "varchar" })
    password: string;

    constructor (props?: IUsers | any) {
        this.id = props?.id
        this.username = props?.username
        this.mail = props?.mail
        this.password = props?.password
    }
}
