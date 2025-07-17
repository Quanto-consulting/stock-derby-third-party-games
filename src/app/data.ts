
export enum GameApiName {
    ALL = "all",
    DERBY = "derby",
    MINI_MUTUAL_FUND = "mini_mutual_fund",
    GUESS_FIRST_FOUR = "guess_first_four",
    GUESS_LAST_FOUR = "guess_last_four",
    GUESS_FIRST_EIGHT = "guess_first_eight",
    GUESS_LAST_EIGHT = "guess_last_eight",
    STOCK_SLOTS = "stock_slots",
    STOCK_JACKPOT = "stock_jackpot",
    SEVEN_UP_DOWN = "seven_up_down",
    HEAD_TAIL = "head_tail",
    WHEEL_OF_FORTUNE = "wheel_of_fortune",
    AVIATOR = "aviator",
    DICE = "dice",
    RED_BLACK = "red_black",
  }

export type Game = {
    title: string;
    gameName: GameApiName;
    link: string;
    image: string;
    description: string;
}

export const StockDerbyGames: Game[] = [
    {
        title: "Indian Stock Market",
        gameName: GameApiName.DERBY,
        link: `/games/${GameApiName.DERBY}`,
        image: "/images/nse.png",
        description: "Rouletter game on live NSE stocks",
    },
    // {
    //     title: "Crypto Market",
    //     link: "/game?gameType=crypto",
    //     image: "/images/crypto.png",
    //     description: "Rouletter game on live crypto currencies",
    // },
    {
        title: "US Stock Market",
        gameName: GameApiName.DERBY,
        link: `/games/${GameApiName.DERBY}`,
        image: "/images/us-stock.png",
        description: "Rouletter game on live US stocks",
    },
    {
        title: "Stock Jackpot",
        gameName: GameApiName.STOCK_JACKPOT,
        link: `/games/${GameApiName.STOCK_JACKPOT}`,
        image: "/images/stock-game/stock-jackpot.png",
        description: "Guess Price Movement"
    },
    {

        title: "Stock Slot",
        gameName: GameApiName.STOCK_SLOTS,
        link: `/games/${GameApiName.STOCK_SLOTS}`,
        image: "/images/stock-slot.png",
        description: "Guess Last Price Digit and win"
    },

    // 7 up down
    {
        title: "7 Up Down",
        gameName: GameApiName.SEVEN_UP_DOWN,
        link: `/games/${GameApiName.SEVEN_UP_DOWN}`,
        image: "/images/banner/7-up-game.png",
        description: "14 stocks choosing will more than 7 go up or down"
    }
    ,
    // coin head tail
    {
        title: "Coin Head Tail",
        gameName: GameApiName.HEAD_TAIL,
        link: "/game/single-player/head-tail",
        image: "/images/banner/coin-toss.png",
        description: "Guess the side of the coin"
    }
    ,
    {
        title: "Wheel of Fortune",
        gameName: GameApiName.WHEEL_OF_FORTUNE,
        link: "/game/single-player/wheel-of-fortune",
        image: "/images/banner/wheel-of-fortune.png",
        description: "Guess the side of the coin"
    }
    ,
    {
        title: "Dice Game",
        gameName: GameApiName.DICE,
        link: "/game/single-player/dice-game",
        image: "/images/banner/dice-game.png",
        description: "Guess the side of the coin"
    },
    //     title: "Red Black",
    //     link: "/game/redblack",
    //     image: "/images/redvsblack.png",
    //     description: "Guess Red or Black"
    // },
    {
        title: "Aviator",
        gameName: GameApiName.AVIATOR,
        link: "/game/platform/stock-game/aviator",
        image: "/images/banner/aviator.png",
        description: "Guess the side of the coin"
    }

]
