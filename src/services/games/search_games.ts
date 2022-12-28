import {GamesController} from "../../controllers/games";
import {Request, Response} from "express";

const gamesController: GamesController = new GamesController()

export async function search_games(req: Request, res: Response) {
    gamesController.search_games(req, res)
}