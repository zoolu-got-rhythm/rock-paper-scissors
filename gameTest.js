"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
// game test 
let playerA = new _1.Player("bob", Math.random().toString(), _1.hands[Math.floor(Math.random() * _1.hands.length)]);
let playerB = new _1.Player("max", Math.random().toString(), _1.hands[Math.floor(Math.random() * _1.hands.length)]);
let matchA = new _1.Match(playerA, playerB);
console.log("playerA", playerA);
console.log("playerB", playerB);
// first to 3 round wins, maximum of 5 rounds can be played
playerA.setCurrentHand(_1.Hand.ROCK);
playerB.setCurrentHand(_1.Hand.SCISSORS);
matchA.getWinnerOfRound();
matchA.getWinnerOfRound();
playerB.setCurrentHand(_1.Hand.PAPER);
matchA.getWinnerOfRound();
matchA.getWinnerOfRound();
playerA.setCurrentHand(_1.Hand.SCISSORS);
matchA.getWinnerOfRound(); // winner announced here
matchA.getWinnerOfRound(); // void round
matchA.getWinnerOfRound(); // void round
