# rock-paper-scissors model (TypeScript)

## class diagram/design of object oriented model
the idea is for the model/design to be fairly simple and not overly verbose, so you can easily test it and hook into its state using the observer pattern to write your own applications and view layers, e.g: web gui/CLI gui or a web socket application etc.

```mermaid
classDiagram
    class Player {
        +String name
        +String id
        +Hand currentHand
        +setCurrentHand(hand: Hand)
    }

    class MatchScore {
        &lt;&lt;interface&gt;&gt;
        +[key: string]: number
    }

    class Observable~T,E~ {
        &lt;&lt;generic&gt;&gt;
    }

    class Match {
        +Player playerA
        +Player playerB
        +MatchScore score
        +Player winningPlayer
        +boolean gameIsFinished
        +ResultWinCondition howWasRoundWon
        +getWinnerOfRound()
        -getWinnerOfGame()
    }

    class Hand {
        &lt;&lt;enumeration&gt;&gt;
        ROCK
        PAPER
        SCISSORS
    }

    class MatchEvents {
        &lt;&lt;enumeration&gt;&gt;
        PLAYER_A_WINS_ROUND
        PLAYER_B_WINS_ROUND
        TIE
        MATCH_FINISHED
    }

    class ResultWinCondition {
        &lt;&lt;enumeration&gt;&gt;
        ROCK_BEATS_SCISSORS
        PAPER_BEATS_ROCK
        SCISSORS_BEATS_PAPER
    }

    Observable <|-- Match
    Player "1" --> "1" Match : playerA
    Player "1" --> "1" Match : playerB
    Match --> MatchScore
    Match --> ResultWinCondition
    Player --> Hand
```

## running:

### install typescript

`npm i`

### run command line simulation

`npm run start-cmd-line-simulation`

<img src="./cmd-line-simulation.gif">