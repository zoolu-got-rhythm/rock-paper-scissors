import { Player, Match, Hand, MatchEvents } from "./index";

describe("Rock Paper Scissors Model", () => {
  test("Player can set hand", () => {
    const player = new Player("Alice", "1", Hand.ROCK);
    player.setCurrentHand(Hand.PAPER);
    expect(player.currentHand).toBe(Hand.PAPER);
  });

  test("Match determines winner of round", () => {
    const playerA = new Player("A", "1", Hand.ROCK);
    const playerB = new Player("B", "2", Hand.SCISSORS);
    const match = new Match(playerA, playerB);

    let lastEvent: MatchEvents | null = null;
    match.attach({
      update: (_match, event) => {
        lastEvent = event;
      },
    });

    match.getWinnerOfRound();
    expect(match.score[playerA.id]).toBe(1);
    expect(lastEvent).toBe(MatchEvents.PLAYER_A_WINS_ROUND);
  });

  test("Match finishes when a player reaches 3 points", () => {
    const playerA = new Player("A", "1", Hand.ROCK);
    const playerB = new Player("B", "2", Hand.SCISSORS);
    const match = new Match(playerA, playerB);

    let finished = false;
    match.attach({
      update: (_match, event) => {
        if (event === MatchEvents.MATCH_FINISHED) finished = true;
      },
    });

    for (let i = 0; i < 3; i++) {
      expect(finished).toBe(false);
      match.getWinnerOfRound();
    }

    expect(match.winningPlayer).toBe(playerA);
    expect(finished).toBe(true);
  });

  test("only event that can fire is match is finished (MatchEvents.MATCH_FINISHED) when trying to play subsequent rounds", () => {
    const playerA = new Player("A", "1", Hand.ROCK);
    const playerB = new Player("B", "2", Hand.SCISSORS);
    const match = new Match(playerA, playerB);

    // let nOfUpdates = 0;
    let lastEvent: MatchEvents | null = null;

    match.attach({
      update: (_match, event) => {
        lastEvent = event;
        // nOfUpdates++;
      },
    });

    for (let i = 0; i < 10; i++) {
      match.getWinnerOfRound();
    }
    expect(lastEvent).toBe(MatchEvents.MATCH_FINISHED);
  });

  test("when a player wins the match, the winningPlayer property is set and cannot be overriden with the other player", () => {
    const playerA = new Player("A", "1", Hand.ROCK); // p-a rock > p-b scissors
    const playerB = new Player("B", "2", Hand.SCISSORS);
    const match = new Match(playerA, playerB);

    expect(match.winningPlayer).toBeNull();

    for (let i = 0; i < 3; i++) {
      match.getWinnerOfRound();
    }
    expect(match.winningPlayer).toBe(playerA);

    // try to make player B win now
    playerB.setCurrentHand(Hand.ROCK); // p-b rock > p-a scissors
    playerA.setCurrentHand(Hand.SCISSORS);

    for (let i = 0; i < 4; i++) {
      match.getWinnerOfRound();
    }

    expect(match.winningPlayer).toBe(playerA);
  });
});
