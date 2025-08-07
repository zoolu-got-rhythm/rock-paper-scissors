import { hands, Match, MatchEvents, Player } from ".";
import { Observer } from "./observerPattern";
import sleep from "./sleep";

let playerA = new Player(
  "robin",
  Math.random().toString(),
  hands[Math.floor(Math.random() * hands.length)]
);
let playerB = new Player(
  "george",
  Math.random().toString(),
  hands[Math.floor(Math.random() * hands.length)]
);

let matchA = new Match(playerA, playerB);

class RockPaperScissorsCLIObserver implements Observer<Match, MatchEvents> {
  winnerAnnounced: boolean;

  constructor() {
    this.winnerAnnounced = false;
  }

  update(ObjectRef: Match, observableEventEnum: MatchEvents) {
    switch (observableEventEnum) {
      case MatchEvents.PLAYER_A_WINS_ROUND:
        this.playerAWinsRound(ObjectRef);
        break;
      case MatchEvents.PLAYER_B_WINS_ROUND:
        this.playerBWinsRound(ObjectRef);
        break;
      case MatchEvents.TIE:
        this.tie(ObjectRef);
        break;
      case MatchEvents.MATCH_FINISHED:
        this.matchFinished(ObjectRef);
        break;
    }
  }

  playerAWinsRound(ObjectRef: Match) {
    console.log(playerA.name + " wins round \n");
  }

  playerBWinsRound(ObjectRef: Match) {
    console.log(playerB.name + " wins round \n");
  }

  tie(ObjectRef: Match) {
    console.log("round tie \n");
  }

  matchFinished(ObjectRef: Match) {
    if (!this.winnerAnnounced) {
      console.log(ObjectRef.winningPlayer?.name + " wins the match!");
      this.winnerAnnounced = true;
    } else {
      console.log(
        "match has ended: " + ObjectRef.getWinnerOfRound.name + " won"
      );
    }
  }
}

matchA.attach(new RockPaperScissorsCLIObserver());

let round = (onRoundEnded: () => void) => {
  let count = 0;
  let tid = setInterval(() => {
    count++;
    if (count == 3) {
      console.log("scissors! \n");
      playerA.setCurrentHand(hands[Math.floor(Math.random() * hands.length)]);
      playerB.setCurrentHand(hands[Math.floor(Math.random() * hands.length)]);
      console.log(`${playerA.name} reveals = ${playerA.currentHand}`);
      console.log(`${playerB.name} reveals = ${playerB.currentHand}`);
      matchA.getWinnerOfRound();
      console.log(
        matchA.score[playerA.id] + " - " + matchA.score[playerB.id] + "\n"
      );
      // count = 0;
      clearInterval(tid);
      if (!matchA.gameIsFinished) onRoundEnded();
    } else {
      console.log(count == 1 ? "rock..." : "paper...");
    }
  }, 1000); // 1000ms = 1s
};

const roundSpeedInMilliseconds = 1000;
let playRound = () => {
  round(async () => {
    await sleep(roundSpeedInMilliseconds);
    playRound(); // call self (recursively)
  });
};

async function playGame() {
  console.log("ROCK, PAPER, SCISSORS! FIRST TO 3");
  console.log(
    playerA.name.toUpperCase() + " VS " + playerB.name.toUpperCase() + "\n"
  );
  await sleep(2000);
  playRound();
}

playGame();
