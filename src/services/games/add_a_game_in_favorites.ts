import {GamesController} from "../../controllers/games";
import {Request, Response} from "express";

const gamesController: GamesController = new GamesController()

export async function add_game_in_favorite(req: Request, res: Response) {
    gamesController.add_game_in_favorite(req, res)
}