// rock paper scissors business logic/application state/model data


enum Hand{
    ROCK = "ROCK",
    PAPER = "PAPER",
    SCISSORS = "SCISSORS"
}

const hands: Hand[] = [Hand.ROCK, Hand.PAPER, Hand.SCISSORS];

class Player{
    name: string;
    id: string; // could be uuid
    currentHand: Hand;

    constructor(name: string, id: string, currentHand: Hand){
        this.name = name;
        this.id = id;
        this.currentHand = currentHand;
    }

    public setCurrentHand(hand: Hand){
        this.currentHand = hand;
    }
}

interface MatchScore{
    [key: string]: number; //id of player and score for Match
}

type OnWinningPlayer = (player: Player) => void;

// first to 3
class Match{
    playerA: Player;
    playerB: Player;
    score: MatchScore;
    onWinningPlayer: OnWinningPlayer;
    gameIsFinished: boolean;
    constructor(playerA: Player, playerB: Player, onWinningPlayer: OnWinningPlayer){
        this.playerA = playerA;
        this.playerB = playerB;
        this.score = {
            [this.playerA.id]: 0,
            [this.playerB.id]: 0
        }
        this.onWinningPlayer = onWinningPlayer;
        this.gameIsFinished = false;
    }

    public getWinnerOfRound(){
        if(this.gameIsFinished){
            return;
        }

        if(this.playerA.currentHand === Hand.ROCK && this.playerB.currentHand === Hand.SCISSORS){ // p-a rock > p-b scissors
            this.score[this.playerA.id] += 1;
            console.log("player a wins round");
        }else if(this.playerA.currentHand === Hand.ROCK && this.playerB.currentHand === Hand.PAPER){ // p-a rock < p-b paper
            this.score[this.playerB.id] += 1;
            console.log("player b wins round");
        }else if(this.playerA.currentHand === Hand.SCISSORS && this.playerB.currentHand === Hand.PAPER){ // p-a scissors > p-b paper
            this.score[this.playerA.id] += 1;
            console.log("player a wins round");
        }else if(this.playerB.currentHand === Hand.ROCK && this.playerA.currentHand === Hand.SCISSORS){ // p-a scissors < p-b rock
            this.score[this.playerB.id] += 1;
     -       console.log("player b wins round");
        }else if(this.playerB.currentHand === Hand.ROCK && this.playerA.currentHand === Hand.PAPER){ // p-a paper > p-b rock
            this.score[this.playerA.id] += 1;
            console.log("player a wins round");
        }else if(this.playerB.currentHand === Hand.SCISSORS && this.playerA.currentHand === Hand.PAPER){ // p-a paper < p-b scissors
            this.score[this.playerB.id] += 1;
            console.log("player b wins round");
        }else{ // tie
            console.log("tie");
        }

        


        if(this.score[this.playerA.id] === 3 || this.score[this.playerB.id] === 3){
            this.getWinnerOfGame();
        }
    }

    private getWinnerOfGame(){
        this.gameIsFinished = true;
        const winningPlayer: Player = this.score[this.playerA.id] === 3 ? this.playerA : this.playerB;
        this.onWinningPlayer(winningPlayer);
    }
}

export {Player, Match, Hand, hands};