import { hands, Match, Player } from ".";
import sleep from "./sleep";



let playerA = new Player("robin", Math.random().toString(), hands[Math.floor(Math.random() * hands.length)]);
let playerB = new Player("george", Math.random().toString(), hands[Math.floor(Math.random() * hands.length)]);

let matchA = new Match(playerA, playerB, (player: Player) => {
    console.log(player.name + " wins!");
});

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
