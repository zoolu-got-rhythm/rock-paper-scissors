import { Player, Match, Hand, hands } from ".";

// game api test 
let playerA = new Player("bob", Math.random().toString(), hands[Math.floor(Math.random() * hands.length)]);
let playerB = new Player("max", Math.random().toString(), hands[Math.floor(Math.random() * hands.length)]);

let matchA = new Match(playerA, playerB);

console.log("playerA", playerA);
console.log("playerB", playerB);

// first to 3 round wins
playerA.setCurrentHand(Hand.ROCK);
playerB.setCurrentHand(Hand.SCISSORS);
matchA.getWinnerOfRound();
matchA.getWinnerOfRound();
playerB.setCurrentHand(Hand.PAPER);
matchA.getWinnerOfRound();
matchA.getWinnerOfRound();
// will be tied at 2-2 each here

playerA.setCurrentHand(Hand.SCISSORS);
matchA.getWinnerOfRound(); // winner announced here
matchA.getWinnerOfRound(); // void round
matchA.getWinnerOfRound(); // void round

// to start a new match, instantiate a new match object and repeat the process
