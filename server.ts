import {SteamCall} from "./src/config";
import express, {Request, Response} from 'express';
import {ColorsFont} from "./src/config/colors-font";
import * as bodyParser from "body-parser";

const app: express.Application = express();
const port: number = 3000;

const steam_call = new SteamCall()
app.use(bodyParser.json());

steam_call.get_top_100_games_fr()
steam_call.get_top_100_games_en()

/***********************************************/
// GAMES
import {search_games} from "./src/services/games/search_games";
import {add_game_in_favorite} from "./src/services/games/add_a_game_in_favorites";
import {add_game_in_wishlist} from "./src/services/games/add_a_game_in_wishlist";

app.get('/games/top', (req: Request, res: Response) => {
    let lang = req.query.lang
    if(lang === 'fr')
        res.send({steam_call.read_cache_local_fr()});
    else
        res.send({steam_call.read_cache_local_en()});
});

app.post('/games/search', (req: Request, res: Response) => {
    search_games(req, res)
})

app.post('/games/add_in_favorite',  (req: Request, res: Response) => {
    add_game_in_favorite(req, res)
})

app.post('/games/add_in_wishlist',  (req: Request, res: Response) => {
    add_game_in_wishlist(req, res)
})

/***********************************************/
// USERS
import {login} from "./src/services/users/login";
import {register} from "./src/services/users/register"
import {reset_password} from "./src/services/users/reset_password";
import {get_games_in_wishlist} from "./src/services/users/get_games_in_wishlist";
import {get_games_in_favorite} from "./src/services/users/get_games_in_favorite";

app.post('/users/register', (req: Request, res: Response) => {
    register(req, res)
})

app.post('/users/login',  (req: Request, res: Response) => {
    login(req, res)
})

app.post('/users/reset_password',  (req: Request, res: Response) => {
    reset_password(req, res)
})

app.get('/users/games_wishlist', (req: Request, res: Response) => {
    get_games_in_wishlist(req, res)
})

app.get('/users/games_favorite', (req: Request, res: Response) => {
    get_games_in_favorite(req, res)
})

/***********************************************/

app.listen(port, () => {
    console.log(ColorsFont.yellow, `TypeScript with Express on localhost:${port}/`);
});
