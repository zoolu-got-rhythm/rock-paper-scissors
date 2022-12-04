import { hands, Match, MatchEvents, Player } from ".";
import { Observer } from "./observerPattern";
import sleep from "./sleep";

class RockPaperScissorsCLIObserver implements Observer<Match, MatchEvents>{
    winnerAnnounced: boolean;

    constructor(){
        this.winnerAnnounced = false;
    }
    
    update(ObjectRef: Match, observableEventEnum: MatchEvents){
        switch(observableEventEnum){
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

    playerAWinsRound(ObjectRef: Match){
        console.log(playerA.name + " wins round");
    }

    playerBWinsRound(ObjectRef: Match){
        console.log(playerB.name + " wins round");
    }

    tie(ObjectRef: Match){
        console.log("round tie");
    }

    matchFinished(ObjectRef: Match){
        if(!this.winnerAnnounced){
            console.log(ObjectRef.winningPlayer?.name + " wins the match!");
            this.winnerAnnounced = true;
        }else{
            console.log("match has ended: " + ObjectRef.getWinnerOfRound.name + " won");
        }
    }
}

let playerA = new Player("robin", Math.random().toString(), hands[Math.floor(Math.random() * hands.length)]);
let playerB = new Player("george", Math.random().toString(), hands[Math.floor(Math.random() * hands.length)]);

let matchA = new Match(playerA, playerB);
matchA.attach(new RockPaperScissorsCLIObserver());

let round = (onRoundEnded: () => void) => {
    let count = 0;
    let tid = setInterval(() => {
        
        count++; 
        if(count == 3){
            playerA.setCurrentHand(hands[Math.floor(Math.random() * hands.length)]);
            playerB.setCurrentHand(hands[Math.floor(Math.random() * hands.length)]);
            console.log("PLAYER A HAND = " + playerA.currentHand);
            console.log("PLAYER B HAND = " + playerB.currentHand);
            matchA.getWinnerOfRound();
            console.log(matchA.score[playerA.id] + " - " + matchA.score[playerB.id]);
            // count = 0;
            clearInterval(tid);
            if(!matchA.gameIsFinished)
                onRoundEnded();
                
        }else{
            console.log(count);
        }
    }, 1000); // 1000ms = 1s
}

let playRound = () => {
    round(async () => {
        await sleep(2000);
        playRound(); // call self (recursively)
    })
}

async function playGame(){
    console.log("ROCK, PAPER, SCISSORS! FIRST TO 3");
    console.log(playerA.name.toUpperCase() + " VS " + playerB.name.toUpperCase());
    await sleep(2000);
    playRound();
}

playGame(); 
