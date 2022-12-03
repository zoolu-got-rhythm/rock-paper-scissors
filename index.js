"use strict";
// rock paper scissors business logic/application state/model data
Object.defineProperty(exports, "__esModule", { value: true });
exports.hands = exports.Hand = exports.Match = exports.Player = void 0;
const ObserverPattern_1 = require("./ObserverPattern");
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
})(MatchEvents || (MatchEvents = {}));
// first to 3
class Match extends ObserverPattern_1.Observable {
    constructor(playerA, playerB, onWinningPlayer) {
        super();
        this.playerA = playerA;
        this.playerB = playerB;
        this.score = {
            [this.playerA.id]: 0,
            [this.playerB.id]: 0
        };
        this.onWinningPlayer = onWinningPlayer;
        this.gameIsFinished = false;
    }
    getWinnerOfRound() {
        if (this.gameIsFinished) {
            return;
        }
        if (this.playerA.currentHand === Hand.ROCK && this.playerB.currentHand === Hand.SCISSORS) { // p-a rock > p-b scissors
            this.score[this.playerA.id] += 1;
            console.log("player a wins round");
        }
        else if (this.playerA.currentHand === Hand.ROCK && this.playerB.currentHand === Hand.PAPER) { // p-a rock < p-b paper
            this.score[this.playerB.id] += 1;
            console.log("player b wins round");
        }
        else if (this.playerA.currentHand === Hand.SCISSORS && this.playerB.currentHand === Hand.PAPER) { // p-a scissors > p-b paper
            this.score[this.playerA.id] += 1;
            console.log("player a wins round");
        }
        else if (this.playerB.currentHand === Hand.ROCK && this.playerA.currentHand === Hand.SCISSORS) { // p-a scissors < p-b rock
            this.score[this.playerB.id] += 1;
            -console.log("player b wins round");
        }
        else if (this.playerB.currentHand === Hand.ROCK && this.playerA.currentHand === Hand.PAPER) { // p-a paper > p-b rock
            this.score[this.playerA.id] += 1;
            console.log("player a wins round");
        }
        else if (this.playerB.currentHand === Hand.SCISSORS && this.playerA.currentHand === Hand.PAPER) { // p-a paper < p-b scissors
            this.score[this.playerB.id] += 1;
            console.log("player b wins round");
        }
        else { // tie
            console.log("tie");
        }
        if (this.score[this.playerA.id] === 3 || this.score[this.playerB.id] === 3) {
            this.getWinnerOfGame();
        }
    }
    getWinnerOfGame() {
        this.gameIsFinished = true;
        const winningPlayer = this.score[this.playerA.id] === 3 ? this.playerA : this.playerB;
        this.onWinningPlayer(winningPlayer);
    }
}
exports.Match = Match;
