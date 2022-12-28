import {DataSource} from "typeorm";
import {ColorsFont} from "./colors-font";
import {Games} from "../models/Games";
import {Wishlist} from "../models/Wishlist";
import {Favorites} from "../models/Favorites";
import {Users} from "../models/Users";

export class NosqlDb {
    protected appDataSource: DataSource;

    constructor() {
    }

    init_db() {
        this.appDataSource = new DataSource({
            type: "mysql",
            host: "db.erzalauren.fr",
            port: 3306,
            username: "db",
            password: "password",
            database: "steam_app",
            entities: [Games, Wishlist, Favorites, Users],
            synchronize: true,
        })

        this.appDataSource.initialize().then(() => {
            console.log(ColorsFont.green, 'CONNECTION TO THE DATABASE HAS BEEN INITIALIZED')
        }).catch((error: Error) => {
            console.log(ColorsFont.red, "Error : "+error.message)
        })
    }

    getAppDataSource() {
        return this.appDataSource
    }
}