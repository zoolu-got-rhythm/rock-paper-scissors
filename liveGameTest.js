"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const sleep_1 = __importDefault(require("./sleep"));
let playerA = new _1.Player("chris", Math.random().toString(), _1.hands[Math.floor(Math.random() * _1.hands.length)]);
let playerB = new _1.Player("jose", Math.random().toString(), _1.hands[Math.floor(Math.random() * _1.hands.length)]);
let matchA = new _1.Match(playerA, playerB, (player) => {
    console.log(player.name + " wins!");
});
let round = (onRoundEnded) => {
    let count = 0;
    let tid = setInterval(() => {
        count++;
        if (count == 3) {
            playerA.setCurrentHand(_1.hands[Math.floor(Math.random() * _1.hands.length)]);
            playerB.setCurrentHand(_1.hands[Math.floor(Math.random() * _1.hands.length)]);
            console.log("PLAYER A HAND = " + playerA.currentHand);
            console.log("PLAYER B HAND = " + playerB.currentHand);
            matchA.getWinnerOfRound();
            console.log(matchA.score[playerA.id] + " - " + matchA.score[playerB.id]);
            // count = 0;
            clearInterval(tid);
            if (!matchA.gameIsFinished)
                onRoundEnded();
        }
        else {
            console.log(count);
        }
    }, 1000); // 1000ms = 1s
};
let playRound = () => {
    round(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, sleep_1.default)(2000);
        playRound(); // call self (recursively)
    }));
};
function playGame() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("ROCK, PAPER, SCISSORS! FIRST TO 3");
        console.log(playerA.name.toUpperCase() + " VS " + playerB.name.toUpperCase());
        yield (0, sleep_1.default)(2000);
        playRound();
    });
}
playGame();
