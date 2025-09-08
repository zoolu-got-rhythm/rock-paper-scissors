import { Player, Match, Hand, hands, MatchEvents } from ".";
import { Observer } from "./observerPattern";

// game api test
let playerA = new Player(
  "bob", // player name
  Math.random().toString(), // unique player id
  hands[Math.floor(Math.random() * hands.length)] // initial rock, paper, scissors hand
);
let playerB = new Player(
  "max", // player name
  Math.random().toString(), // unique player id
  hands[Math.floor(Math.random() * hands.length)] // initial rock, paper, scissors hand
);

let matchA = new Match(playerA, playerB);

class YourUI implements Observer<Match, MatchEvents> {
  constructor() {}
  update(ObjectRef: Match, observableEventEnum: MatchEvents) {
    // get notified of changes to match state and event types here,
    // and update the UI accordingly
    switch (observableEventEnum) {
      case MatchEvents.PLAYER_A_WINS_ROUND:
        // player A won the round, update the UI accordingly
        console.log(`player A: ${ObjectRef.getWinnerOfRound()} wins the round`);
        break;
      case MatchEvents.PLAYER_B_WINS_ROUND:
        // player B won the round, update the UI accordingly
        console.log(`player B: ${ObjectRef.getWinnerOfRound()} wins the round`);
        break;
      case MatchEvents.TIE:
        // round was a tie, update the UI accordingly
        console.log(`round was a tie`);
        break;
      case MatchEvents.MATCH_FINISHED:
        // match is finished, update the UI accordingly
        console.log(`match is finished, winner is ${ObjectRef.winningPlayer?.name}`);
        break;
    }
  }
}

matchA.attach(new YourUI());

// start playing a match

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

// to start a new match, instantiate a new match object and pass in player objects again, repeat the process
