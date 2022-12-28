import {Request, Response} from "express";
import {UsersController} from "../../controllers/users";

const usersController: UsersController = new UsersController()

export async function register(req: Request, res: Response) {
    usersController.register(req, res)
}