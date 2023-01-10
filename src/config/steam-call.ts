import {AxiosResponse} from "axios";
import {Games} from "../models/Games";
import {ColorsFont} from "./colors-font";

const fs = require('fs');
const cron = require('node-cron');
const axios = require('axios');

 export class SteamCall {
     list_top_100_games: Games[] = []

     constructor() {
         cron.schedule('0 3 * * *', () => {
             this.get_top_100_games_fr().then()
         });

         cron.schedule('0 5 * * *', () => {
             this.get_top_100_games_en().then()
         });
     }

     async get_top_100_games_fr() {
         fs.unlink('cache-fr.json', async (err: Error) => {
             if (err) console.log(err.message);
             await axios.get("https://api.steampowered.com/ISteamChartsService/GetMostPlayedGames/v1/").then((data: AxiosResponse) => {
                 data.data.response.ranks.forEach(async (rank: any) => {
                     let appid = rank.appid
                     await axios.get('https://store.steampowered.com/api/appdetails?l=french&appids=' + appid).then((data: AxiosResponse) => {
                         let datas = data.data[appid].data

                         if(datas === undefined) {
                             datas = data.data[appid]
                         }

                         if(data.data[appid].success === true) {
                             this.list_top_100_games.push(new Games({
                                 game_id: appid,
                                 game_name: datas.name,
                                 game_description: datas.short_description,
                                 game_picture: datas.header_image,
                                 game_background: datas.background,
                                 game_price: datas.price_overview.final_formatted,
                                 game_promotion: datas.price_overview.discount_percent,
                                 publishers: datas.developers[0]
                             }))
                         }
                     }).catch((err: Error) => {
                         console.log(ColorsFont.red, 'Error app id => '+appid+' '+err)
                     })

                     fs.writeFile('cache-fr.json', JSON.stringify(this.list_top_100_games), 'utf8', () => {

                     });

                 })
             }).catch((err: Error) => {
                 console.log(ColorsFont.red, err)
             })
         })
     }

     async get_top_100_games_en() {
         fs.unlink('cache-en.json', async (err: Error) => {
             if (err) console.log(err.message);
             await axios.get("https://api.steampowered.com/ISteamChartsService/GetMostPlayedGames/v1/").then((data: AxiosResponse) => {
                 data.data.response.ranks.forEach(async (rank: any) => {
                     let appid = rank.appid
                     await axios.get('https://store.steampowered.com/api/appdetails?l=english&appids=' + appid).then((data: AxiosResponse) => {
                         let datas = data.data[appid].data

                         if(datas === undefined) {
                             datas = data.data[appid]
                         }

                         if(data.data[appid].success === true) {
                             this.list_top_100_games.push(new Games({
                                 game_id: appid,
                                 game_name: datas.name,
                                 game_description: datas.short_description,
                                 game_picture: datas.header_image,
                                 game_background: datas.background,
                                 game_price: datas.price_overview.final_formatted,
                                 game_promotion: datas.price_overview.discount_percent,
                                 publishers: datas.developers[0]
                             }))
                         }
                     }).catch((err: Error) => {
                         console.log(ColorsFont.red, 'Error app id => '+appid+' '+err)
                     })

                     fs.writeFile('cache-en.json', JSON.stringify(this.list_top_100_games), 'utf8', () => {

                     });

                 })
             }).catch((err: Error) => {
                 console.log(ColorsFont.red, err)
             })
         })
     }

     read_cache_local_fr() {
         return require('../../../cache-fr.json')
     }

     read_cache_local_en() {
         return require('../../../cache-en.json')
     }
 }
