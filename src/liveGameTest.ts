
import { Player, hands, Match, MatchEvents, ResultWinCondition } from "./index.js";
import { Observer } from "./observerPattern.js";
import sleep from "./sleep.js";

const playerA: Player = new Player("sam", Math.random().toString(), hands[Math.floor(Math.random() * hands.length)]);
const playerB: Player = new Player("maria", Math.random().toString(), hands[Math.floor(Math.random() * hands.length)]);

// function getPlayerNamesFromCmdLineInput() {
//     if (require.main === module) {
//         const rl = readline.createInterface({
//             input: process.stdin,
//             output: process.stdout,
//         });

//         rl.question("Enter Player A name: ", (playerAName) => {
//             rl.question("Enter Player B name: ", (playerBName) => {
//                 // Example: create players with default hands
//                 playerA = new Player(playerAName, Math.random().toString(), hands[Math.floor(Math.random() * hands.length)]);
//                 playerB = new Player(playerBName, Math.random().toString(), hands[Math.floor(Math.random() * hands.length)]);

//                 // You can now use playerA and playerB in your match logic
//                 console.log(`Player A: ${playerA.name}, Player B: ${playerB.name}`);

//                 rl.close();
//             });
//         });
//     }
// }

// getPlayerNamesFromCmdLineInput();

const matchA = new Match(playerA!, playerB!);

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

    private howPlayerWonMessage(resultWinCondition: ResultWinCondition | null, winnerName: string, loserName: string): string {
        switch (resultWinCondition) {
            case ResultWinCondition.ROCK_BEATS_SCISSORS:
                return `${winnerName}'s rock blunts ${loserName}'s scissors`;
            case ResultWinCondition.PAPER_BEATS_ROCK:
                return `${winnerName}'s paper captures ${loserName}'s rock`;
            case ResultWinCondition.SCISSORS_BEATS_PAPER:
                return `${winnerName}'s scissors cut through ${loserName}'s paper`;
            default:
                return "stale mate";
        }
    }

    playerAWinsRound(ObjectRef: Match) {
        console.log(this.howPlayerWonMessage(ObjectRef.howWasRoundWon, playerA.name, playerB.name));
        console.log(playerA.name + " wins round \n");
    }

    playerBWinsRound(ObjectRef: Match) {
        console.log(this.howPlayerWonMessage(ObjectRef.howWasRoundWon, playerB.name, playerA.name));
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
            console.log("match has ended: " + ObjectRef.getWinnerOfRound.name + " won");
        }
    }
}

matchA.attach(new RockPaperScissorsCLIObserver());

const round = (onRoundEnded: () => void) => {
    let count = 0;
    const tid = setInterval(() => {
        count++;
        if (count == 3) {
            console.log("scissors! \n");
            playerA.setCurrentHand(hands[Math.floor(Math.random() * hands.length)]);
            playerB.setCurrentHand(hands[Math.floor(Math.random() * hands.length)]);
            console.log(`${playerA.name} reveals = ${playerA.currentHand}`);
            console.log(`${playerB.name} reveals = ${playerB.currentHand}`);
            matchA.getWinnerOfRound();
            console.log(playerA.name + " " + matchA.score[playerA.id] + " - " + playerB.name + " " + matchA.score[playerB.id] + "\n");
            // count = 0;
            clearInterval(tid);
            if (!matchA.gameIsFinished) onRoundEnded();
        } else {
            console.log(count == 1 ? "rock..." : "paper...");
        }
    }, 1000); // 1000ms = 1s
};

const roundSpeedInMilliseconds = 1500;
const playRound = () => {
    round(async () => {
        await sleep(roundSpeedInMilliseconds);
        playRound(); // call self (recursively)
    });
};

async function playGame() {
    console.log("ROCK, PAPER, SCISSORS! FIRST TO 3");
    console.log(playerA.name.toUpperCase() + " VS " + playerB.name.toUpperCase() + "\n");
    await sleep(2000);
    playRound();
}

playGame();
