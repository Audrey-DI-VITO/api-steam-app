import {NosqlDb} from "../config";
import {Request, Response} from "express";
import {Favorites} from "../models/Favorites";
import {Wishlist} from "../models/Wishlist";

export class GamesUsersController extends NosqlDb {
    game_is_in_favorites = async (req: Request, res: Response) => {
        let id_user = req.params.id_user
        let id_game = req.params.id_game

        let favoriteRepo = this.appDataSource.getRepository(Favorites)
        let already_in_favorites = await favoriteRepo.find({
            where: {
                fk_user_id: Number(id_user),
                game_id: Number(id_game)
            }
        })

        if(already_in_favorites.length > 0) {
            res.status(409).send("Already in favorites")
            return
        }
        res.status(200).send()
        return
    }

    game_is_in_wishlist = async (req: Request, res: Response) => {
        let id_user = req.params.id_user
        let id_game = req.params.id_game

        let wishlistRepo = this.appDataSource.getRepository(Wishlist)
        let already_in_wishlist = await wishlistRepo.find({
            where: {
                fk_user_id: Number(id_user),
                game_id: Number(id_game)
            }
        })

        if(already_in_wishlist.length > 0) {
            res.status(409).send("Already in wishlist")
            return
        }
        res.status(200).send()
        return
    }
}
