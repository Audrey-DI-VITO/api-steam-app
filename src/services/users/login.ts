import {Request, Response} from "express";
import {UsersController} from "../../controllers/users";

const usersController: UsersController = new UsersController()

export async function login(req: Request, res: Response) {
    usersController.login(req, res)
}