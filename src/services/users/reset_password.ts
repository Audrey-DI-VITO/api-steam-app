import {Request, Response} from "express";
import {UsersController} from "../../controllers/users";

const usersController: UsersController = new UsersController()

export async function reset_password(req: Request, res: Response) {
    usersController.reset_password(req, res)
}