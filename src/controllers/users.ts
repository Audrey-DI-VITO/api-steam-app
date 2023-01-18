import {NosqlDb} from "../config";
import {Users} from "../models/Users";
import {Request, Response} from "express";
import {Wishlist} from "../models/Wishlist";
import {Games} from "../models/Games";
import {Favorites} from "../models/Favorites";
import axios, {AxiosResponse} from "axios";

export class UsersController extends NosqlDb {
    register = async (req: Request, res: Response) => {
        let user = new Users({
            mail: req.body.mail,
            username: req.body.pseudo,
            password: req.body.pwd
        })

        await this.appDataSource.getRepository(Users).save(user)
        res.status(201).send("User has been successfully created")
    }

    login = async (req: Request, res: Response) => {
        let found_user = await this.appDataSource.getRepository(Users).findOne({
            where: {
                mail: req.body.mail
            }
        })

        if(found_user) {
            if(found_user.password === req.body.pwd) {
                res.status(200).send("Connection allowed")
            } else {
                res.status(403).send("Forbidden")
            }
        } else {
            res.status(404).send("Not Found")
        }
    }

    reset_password = async (req: Request, res: Response) => {
        await this.appDataSource.getRepository(Users).update({
            mail: req.body.mail
        }, {
            password: req.body.pwd
        })

        res.status(200).send("Your password has been successfully updated")
    }

    get_games_in_wishlist = async (req: Request, res: Response) => {
        let wishlist = await this.appDataSource.getRepository(Wishlist).find({
            relations: ["fk_user_id"]
        })

        let all_games_of_user: any = []

        for(let i = 0; i < wishlist.length; i++) {
            let current_user = new Users(wishlist[i].fk_user_id)
            if(current_user.id === req.body.user_id) {
                await axios.get('https://store.steampowered.com/api/appdetails?l=english&appids='+wishlist[i].game_id).then((details: AxiosResponse) => {
                    let game = new Games({
                        game_id: wishlist[i].game_id,
                        game_name: details.data[wishlist[i].game_id].data.name,
                        game_description: details.data[wishlist[i].game_id].short_description,
                        game_picture: details.data[wishlist[i].game_id].data.header_image,
                        game_background: details.data[wishlist[i].game_id].data.background,
                        game_price: details.data[wishlist[i].game_id].data.price_overview ? details.data[wishlist[i].game_id].data.price_overview.final_formatted ?? "Gratuit" : "Gratuit",
                        game_promotion: details.data[wishlist[i].game_id].data.price_overview ? details.data[wishlist[i].game_id].data.price_overview.discount_percent : 0,
                        publishers: details.data[wishlist[i].game_id].data.publishers
                    })
                    all_games_of_user.push(game)
                })
            }
        }

        res.status(200).send(all_games_of_user)
    }

    get_games_in_favorite = async (req: Request, res: Response) => {
        let favorite = await this.appDataSource.getRepository(Favorites).find({
            relations: ["fk_user_id"]
        })

        let all_games_of_user: any = []

        for(let i = 0; i < favorite.length; i++) {
            let current_user = new Users(favorite[i].fk_user_id)
            if(current_user.id === Number(req.query.user_id)) {
                await axios.get('https://store.steampowered.com/api/appdetails?l=english&appids='+favorite[i].game_id).then((details: AxiosResponse) => {
                    let game = new Games({
                        game_id: favorite[i].game_id,
                        game_name: details.data[favorite[i].game_id].data.name,
                        game_description: details.data[favorite[i].game_id].short_description,
                        game_picture: details.data[favorite[i].game_id].data.header_image,
                        game_background: details.data[favorite[i].game_id].data.background,
                        game_price: details.data[favorite[i].game_id].data.price_overview ? details.data[favorite[i].game_id].data.price_overview.final_formatted : "Gratuit",
                        game_promotion: details.data[favorite[i].game_id].data.price_overview ? details.data[favorite[i].game_id].data.price_overview.discount_percent : 0,
                        publishers: details.data[favorite[i].game_id].data.publishers
                    })
                    all_games_of_user.push(game)
                })
            }
        }

        res.status(200).send(all_games_of_user)
    }
}
