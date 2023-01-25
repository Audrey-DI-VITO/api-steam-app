import {GamesUsersController} from "../../controllers/games_users";
import {Request, Response} from "express";

const gamesController: GamesUsersController = new GamesUsersController()

export async function game_is_in_wishlist(req: Request, res: Response) {
    gamesController.game_is_in_wishlist(req, res)
}
