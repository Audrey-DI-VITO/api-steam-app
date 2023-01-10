import {IGames} from "../interfaces/IGames";

export class Games implements IGames {
    game_id: number
    game_name: string
    game_description: string
    game_picture: string
    game_background: string
    game_price: string
    game_promotion: number | null
    publishers: string[]

    constructor (props?: IGames) {
        this.game_id = props?.game_id
        this.game_name = props?.game_name
        this.game_description = props?.game_description
        this.game_picture = props?.game_picture
        this.game_background = props?.game_background
        this.game_price = props?.game_price
        this.game_promotion = props?.game_promotion
        this.publishers = props?.publishers
    }
}
