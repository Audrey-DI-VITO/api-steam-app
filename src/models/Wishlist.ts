import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Games} from "./Games";
import {Users} from "./Users";

@Entity({name: 'wishlist'})
export class Wishlist {
    @PrimaryGeneratedColumn({ type: "int" })
    id: number = 0

    @Column({ type: "int" })
    game_id: number;

    @ManyToOne(type => Users, user => user.id)
    @JoinColumn({ name: 'fk_user_id' })
    fk_user_id: number;

    constructor (game_id?: number, fk_user_id?: number) {
        this.game_id = game_id
        this.fk_user_id = fk_user_id
    }
}
