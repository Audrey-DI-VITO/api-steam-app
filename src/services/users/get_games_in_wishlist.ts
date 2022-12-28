import {Request, Response} from "express";
import {UsersController} from "../../controllers/users";

const usersController: UsersController = new UsersController()

export async function get_games_in_wishlist(req: Request, res: Response) {
    usersController.get_games_in_wishlist(req, res)
}