// rock paper scissors business logic/application state/model data

import { Observable } from "./observerPattern";



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

enum MatchEvents{
    PLAYER_A_WINS_ROUND,
    PLAYER_B_WINS_ROUND,
    TIE,
    MATCH_FINISHED
}

// first to 3
class Match extends Observable<Match, MatchEvents> {
    playerA: Player;
    playerB: Player;
    score: MatchScore;
    winningPlayer: Player | null; 
    gameIsFinished: boolean;

    constructor(playerA: Player, playerB: Player){
        super();
        this.playerA = playerA;
        this.playerB = playerB;
        this.score = {
            [this.playerA.id]: 0,
            [this.playerB.id]: 0
        }
        this.winningPlayer = null;
        this.gameIsFinished = false;
    }

    public getWinnerOfRound(){
        if(this.gameIsFinished){
            this.notify(MatchEvents.MATCH_FINISHED);
            return;
        }

        if(this.playerA.currentHand === Hand.ROCK && this.playerB.currentHand === Hand.SCISSORS){ // p-a rock > p-b scissors
            this.score[this.playerA.id] += 1;
            this.notify(MatchEvents.PLAYER_A_WINS_ROUND);
        }else if(this.playerA.currentHand === Hand.ROCK && this.playerB.currentHand === Hand.PAPER){ // p-a rock < p-b paper
            this.score[this.playerB.id] += 1;
            this.notify(MatchEvents.PLAYER_B_WINS_ROUND);
        }else if(this.playerA.currentHand === Hand.SCISSORS && this.playerB.currentHand === Hand.PAPER){ // p-a scissors > p-b paper
            this.score[this.playerA.id] += 1;
            this.notify(MatchEvents.PLAYER_A_WINS_ROUND);
        }else if(this.playerB.currentHand === Hand.ROCK && this.playerA.currentHand === Hand.SCISSORS){ // p-a scissors < p-b rock
            this.score[this.playerB.id] += 1;
            this.notify(MatchEvents.PLAYER_B_WINS_ROUND);
        }else if(this.playerB.currentHand === Hand.ROCK && this.playerA.currentHand === Hand.PAPER){ // p-a paper > p-b rock
            this.score[this.playerA.id] += 1;
            this.notify(MatchEvents.PLAYER_A_WINS_ROUND);
        }else if(this.playerB.currentHand === Hand.SCISSORS && this.playerA.currentHand === Hand.PAPER){ // p-a paper < p-b scissors
            this.score[this.playerB.id] += 1;
            this.notify(MatchEvents.PLAYER_B_WINS_ROUND);
        }else{ // tie
            this.notify(MatchEvents.TIE);
        }

        if(this.score[this.playerA.id] === 3 || this.score[this.playerB.id] === 3){
            this.getWinnerOfGame();
        }
    }

    private getWinnerOfGame(){
        this.gameIsFinished = true;
        const winningPlayer: Player = this.score[this.playerA.id] === 3 ? this.playerA : this.playerB;
        this.winningPlayer = winningPlayer;
        this.notify(MatchEvents.MATCH_FINISHED);
    }
}

export {Player, Match, Hand, hands, MatchEvents};