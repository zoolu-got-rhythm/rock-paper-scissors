import { Player, Match, Hand, hands } from ".";


// game test 
let playerA = new Player("bob", Math.random().toString(), hands[Math.floor(Math.random() * hands.length)]);
let playerB = new Player("max", Math.random().toString(), hands[Math.floor(Math.random() * hands.length)]);

let matchA = new Match(playerA, playerB);

console.log("playerA", playerA);
console.log("playerB", playerB);

// first to 3 round wins, maximum of 5 rounds can be played
playerA.setCurrentHand(Hand.ROCK);
playerB.setCurrentHand(Hand.SCISSORS);
matchA.getWinnerOfRound();
matchA.getWinnerOfRound();
playerB.setCurrentHand(Hand.PAPER);
matchA.getWinnerOfRound();
matchA.getWinnerOfRound();

playerA.setCurrentHand(Hand.SCISSORS);
matchA.getWinnerOfRound(); // winner announced here
matchA.getWinnerOfRound(); // void round
matchA.getWinnerOfRound(); // void round