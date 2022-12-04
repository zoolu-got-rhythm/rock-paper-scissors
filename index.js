"use strict";
// rock paper scissors business logic/application state/model data
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchEvents = exports.hands = exports.Hand = exports.Match = exports.Player = void 0;
const observerPattern_1 = require("./observerPattern");
var Hand;
(function (Hand) {
    Hand["ROCK"] = "ROCK";
    Hand["PAPER"] = "PAPER";
    Hand["SCISSORS"] = "SCISSORS";
})(Hand || (Hand = {}));
exports.Hand = Hand;
const hands = [Hand.ROCK, Hand.PAPER, Hand.SCISSORS];
exports.hands = hands;
class Player {
    constructor(name, id, currentHand) {
        this.name = name;
        this.id = id;
        this.currentHand = currentHand;
    }
    setCurrentHand(hand) {
        this.currentHand = hand;
    }
}
exports.Player = Player;
var MatchEvents;
(function (MatchEvents) {
    MatchEvents[MatchEvents["PLAYER_A_WINS_ROUND"] = 0] = "PLAYER_A_WINS_ROUND";
    MatchEvents[MatchEvents["PLAYER_B_WINS_ROUND"] = 1] = "PLAYER_B_WINS_ROUND";
    MatchEvents[MatchEvents["TIE"] = 2] = "TIE";
    MatchEvents[MatchEvents["MATCH_FINISHED"] = 3] = "MATCH_FINISHED";
})(MatchEvents || (MatchEvents = {}));
exports.MatchEvents = MatchEvents;
// first to 3
class Match extends observerPattern_1.Observable {
    constructor(playerA, playerB) {
        super();
        this.playerA = playerA;
        this.playerB = playerB;
        this.score = {
            [this.playerA.id]: 0,
            [this.playerB.id]: 0
        };
        this.winningPlayer = null;
        this.gameIsFinished = false;
    }
    getWinnerOfRound() {
        if (this.gameIsFinished) {
            this.notify(MatchEvents.MATCH_FINISHED);
            return;
        }
        if (this.playerA.currentHand === Hand.ROCK && this.playerB.currentHand === Hand.SCISSORS) { // p-a rock > p-b scissors
            this.score[this.playerA.id] += 1;
            this.notify(MatchEvents.PLAYER_A_WINS_ROUND);
        }
        else if (this.playerA.currentHand === Hand.ROCK && this.playerB.currentHand === Hand.PAPER) { // p-a rock < p-b paper
            this.score[this.playerB.id] += 1;
            this.notify(MatchEvents.PLAYER_B_WINS_ROUND);
        }
        else if (this.playerA.currentHand === Hand.SCISSORS && this.playerB.currentHand === Hand.PAPER) { // p-a scissors > p-b paper
            this.score[this.playerA.id] += 1;
            this.notify(MatchEvents.PLAYER_A_WINS_ROUND);
        }
        else if (this.playerB.currentHand === Hand.ROCK && this.playerA.currentHand === Hand.SCISSORS) { // p-a scissors < p-b rock
            this.score[this.playerB.id] += 1;
            this.notify(MatchEvents.PLAYER_B_WINS_ROUND);
        }
        else if (this.playerB.currentHand === Hand.ROCK && this.playerA.currentHand === Hand.PAPER) { // p-a paper > p-b rock
            this.score[this.playerA.id] += 1;
            this.notify(MatchEvents.PLAYER_A_WINS_ROUND);
        }
        else if (this.playerB.currentHand === Hand.SCISSORS && this.playerA.currentHand === Hand.PAPER) { // p-a paper < p-b scissors
            this.score[this.playerB.id] += 1;
            this.notify(MatchEvents.PLAYER_B_WINS_ROUND);
        }
        else { // tie
            this.notify(MatchEvents.TIE);
        }
        if (this.score[this.playerA.id] === 3 || this.score[this.playerB.id] === 3) {
            this.getWinnerOfGame();
        }
    }
    getWinnerOfGame() {
        this.gameIsFinished = true;
        const winningPlayer = this.score[this.playerA.id] === 3 ? this.playerA : this.playerB;
        this.winningPlayer = winningPlayer;
        this.notify(MatchEvents.MATCH_FINISHED);
    }
}
exports.Match = Match;
