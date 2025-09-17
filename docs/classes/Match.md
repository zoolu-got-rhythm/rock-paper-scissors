[**rock-paper-scissors-app**](../README.md)

***

[rock-paper-scissors-app](../README.md) / Match

# Class: Match

Defined in: [index.ts:47](https://github.com/zoolu-got-rhythm/rock-paper-scissors/blob/ea7f480936e085b19483e8c551aae41136f1b8c2/src/index.ts#L47)

## Extends

- `Observable`\<`Match`, [`MatchEvents`](../enumerations/MatchEvents.md)\>

## Constructors

### Constructor

> **new Match**(`playerA`, `playerB`): `Match`

Defined in: [index.ts:55](https://github.com/zoolu-got-rhythm/rock-paper-scissors/blob/ea7f480936e085b19483e8c551aae41136f1b8c2/src/index.ts#L55)

#### Parameters

##### playerA

[`Player`](Player.md)

##### playerB

[`Player`](Player.md)

#### Returns

`Match`

#### Overrides

`Observable<Match, MatchEvents>.constructor`

## Properties

### gameIsFinished

> **gameIsFinished**: `boolean`

Defined in: [index.ts:52](https://github.com/zoolu-got-rhythm/rock-paper-scissors/blob/ea7f480936e085b19483e8c551aae41136f1b8c2/src/index.ts#L52)

***

### howWasRoundWon

> **howWasRoundWon**: `null` \| [`ResultWinCondition`](../enumerations/ResultWinCondition.md) = `null`

Defined in: [index.ts:53](https://github.com/zoolu-got-rhythm/rock-paper-scissors/blob/ea7f480936e085b19483e8c551aae41136f1b8c2/src/index.ts#L53)

***

### observers

> **observers**: `Observer`\<`Match`, [`MatchEvents`](../enumerations/MatchEvents.md)\>[]

Defined in: [observerPattern.ts:6](https://github.com/zoolu-got-rhythm/rock-paper-scissors/blob/ea7f480936e085b19483e8c551aae41136f1b8c2/src/observerPattern.ts#L6)

#### Inherited from

`Observable.observers`

***

### playerA

> **playerA**: [`Player`](Player.md)

Defined in: [index.ts:48](https://github.com/zoolu-got-rhythm/rock-paper-scissors/blob/ea7f480936e085b19483e8c551aae41136f1b8c2/src/index.ts#L48)

***

### playerB

> **playerB**: [`Player`](Player.md)

Defined in: [index.ts:49](https://github.com/zoolu-got-rhythm/rock-paper-scissors/blob/ea7f480936e085b19483e8c551aae41136f1b8c2/src/index.ts#L49)

***

### score

> **score**: `MatchScore`

Defined in: [index.ts:50](https://github.com/zoolu-got-rhythm/rock-paper-scissors/blob/ea7f480936e085b19483e8c551aae41136f1b8c2/src/index.ts#L50)

***

### winningPlayer

> **winningPlayer**: `null` \| [`Player`](Player.md)

Defined in: [index.ts:51](https://github.com/zoolu-got-rhythm/rock-paper-scissors/blob/ea7f480936e085b19483e8c551aae41136f1b8c2/src/index.ts#L51)

## Methods

### attach()

> **attach**(`observer`): `void`

Defined in: [observerPattern.ts:12](https://github.com/zoolu-got-rhythm/rock-paper-scissors/blob/ea7f480936e085b19483e8c551aae41136f1b8c2/src/observerPattern.ts#L12)

#### Parameters

##### observer

`Observer`\<`Match`, [`MatchEvents`](../enumerations/MatchEvents.md)\>

#### Returns

`void`

#### Inherited from

`Observable.attach`

***

### detach()

> **detach**(`observer`): `void`

Defined in: [observerPattern.ts:16](https://github.com/zoolu-got-rhythm/rock-paper-scissors/blob/ea7f480936e085b19483e8c551aae41136f1b8c2/src/observerPattern.ts#L16)

#### Parameters

##### observer

`Observer`\<`Match`, [`MatchEvents`](../enumerations/MatchEvents.md)\>

#### Returns

`void`

#### Inherited from

`Observable.detach`

***

### getWinnerOfRound()

> **getWinnerOfRound**(): `void`

Defined in: [index.ts:71](https://github.com/zoolu-got-rhythm/rock-paper-scissors/blob/ea7f480936e085b19483e8c551aae41136f1b8c2/src/index.ts#L71)

#### Returns

`void`

***

### notify()

> **notify**(`eventType`): `void`

Defined in: [observerPattern.ts:21](https://github.com/zoolu-got-rhythm/rock-paper-scissors/blob/ea7f480936e085b19483e8c551aae41136f1b8c2/src/observerPattern.ts#L21)

#### Parameters

##### eventType

[`MatchEvents`](../enumerations/MatchEvents.md)

#### Returns

`void`

#### Inherited from

`Observable.notify`
