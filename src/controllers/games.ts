import {Request, Response} from "express";
import {NosqlDb} from "../config";
import {Games} from "../models/Games";
import axios, {AxiosResponse} from "axios";
import {Favorites} from "../models/Favorites";
import {Wishlist} from "../models/Wishlist";

export class GamesController extends NosqlDb {
    already_exists = false;
    games: Games = new Games()

    search_games = async (req: Request, res: Response) => {
        let all_games: Games[] = []
        let game_name = req.body.game_name

        await axios.get("https://steamcommunity.com/actions/SearchApps/"+game_name)
            .then(async (data: AxiosResponse) => {
                for(let i = 0; i < data.data.length; i++) {
                    await axios.get('https://store.steampowered.com/api/appdetails?l=english&appids='+data.data[i].appid).then((details: AxiosResponse) => {
                        all_games.push(new Games({
                            game_id: data.data[i].appid,
                            game_name: details.data[data.data[i].appid].data.name,
                            game_description: details.data[data.data[i].appid].short_description,
                            game_picture: details.data[data.data[i].appid].data.header_image,
                            game_background: details.data[data.data[i].appid].data.background,
                            game_price: details.data[data.data[i].appid].data.price_overview.final_formatted ?? "Gratuit",
                            game_promotion: details.data[data.data[i].appid].data.price_overview.discount_percent ?? 0,
                            publishers: details.data[data.data[i].appid].data.publishers
                        }))
                    })
                }
                res.status(200).send({"games": all_games})
            })
    }

    add_game_in_wishlist = async (req: Request, res: Response) => {
        await axios.get("https://steamcommunity.com/actions/SearchApps/"+req.body.game_name.toUpperCase())
            .then(async (data: AxiosResponse) => {
                await axios.get('https://store.steampowered.com/api/appdetails?l=english&appids='+data.data[0].appid)
                    .then(async () => {
                        let wishlist = new Wishlist(data.data[0].appid, req.body.user_id)

                        let wishlistRepo = this.appDataSource.getRepository(Wishlist)
                        let already_exist_wishlist = await wishlistRepo.find({
                            relations: ['fk_user_id'],
                            where: {
                                game_id: data.data[0].appid
                            }
                        })

                        let cpt = 0;

                        if(already_exist_wishlist.length > 0) {
                            already_exist_wishlist.forEach(async (game: any) => {
                                if(game.game_id !== data.data[0].appid && game.fk_user_id.id !== req.body.user_id) {
                                    cpt += 1
                                }
                            })
                            if(cpt === already_exist_wishlist.length) {
                                await wishlistRepo.save(wishlist)
                                res.status(200).send("Successfully record in database")
                            } else {
                                res.status(409).send("Already exist in database")
                            }
                        } else {
                            await wishlistRepo.save(wishlist)
                            res.status(200).send("Successfully record in database")
                        }
                    })
            })
    }

    add_game_in_favorite = async (req: Request, res: Response) => {
        await axios.get("https://steamcommunity.com/actions/SearchApps/"+req.body.game_name.toUpperCase())
            .then(async (data: AxiosResponse) => {
                await axios.get('https://store.steampowered.com/api/appdetails?l=english&appids='+data.data[0].appid)
                    .then(async () => {
                        let favorite = new Wishlist(data.data[0].appid, req.body.user_id)

                        let favoriteRepo = this.appDataSource.getRepository(Favorites)
                        let already_exist_favorite = await favoriteRepo.find({
                            relations: ['fk_user_id'],
                            where: {
                                game_id: data.data[0].appid
                            }
                        })

                        let cpt = 0;

                        if(already_exist_favorite.length > 0) {
                            already_exist_favorite.forEach(async (game: any) => {
                                if(game.game_id !== data.data[0].appid && game.fk_user_id.id !== req.body.user_id) {
                                    cpt += 1
                                }
                            })
                            if(cpt === already_exist_favorite.length) {
                                await favoriteRepo.save(favorite)
                                res.status(200).send("Successfully record in database")
                            } else {
                                res.status(409).send("Already exist in database")
                            }
                        } else {
                            await favoriteRepo.save(favorite)
                            res.status(200).send("Successfully record in database")
                        }
                    })
            })
    }
}
