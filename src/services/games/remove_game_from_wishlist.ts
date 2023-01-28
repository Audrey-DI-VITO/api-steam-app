import {Request, Response} from "express";
import {GamesController} from "../../controllers/games";

const gamesController: GamesController = new GamesController()

export async function remove_game_from_wishlist(req: Request, res: Response) {
    gamesController.remove_game_from_wishlist(req, res)
}
