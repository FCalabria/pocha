function getMaxCardsDealt(players) {
  return Math.floor(40 / players)
}

function getMaxRounds(players) {
  return 2 * (getMaxCardsDealt(players) - 2) + (3 * players)
}

function getCardsDealtNextRound(rounds, players) {
  const maxRounds = getMaxRounds(players)
  const maxCardsDealt = getMaxCardsDealt(players)
  if (rounds <= players || rounds >= maxRounds - players) {
    return 1
  } else if (rounds <= maxCardsDealt + players - 1) {
    return rounds - players + 2
  } else if (rounds > (maxCardsDealt - 2) + players * 2) {
    return maxRounds - rounds - players - 1
  } else {
    return maxCardsDealt
  }
}

function getDealerNextRound(rounds, players) {
  while (rounds >= players) {
    rounds = rounds - players
  }
  return rounds
}

function getPlayersOrderNextRound(rounds, players) {
  const last = getDealerNextRound(rounds, players)
  return new Array(players).fill(0)
    .map((v, i) => {
      const base = last + i + 1;
      return base < players ? base : base - players
    })
}

/**
 * Gives info about the cards to deal the next round and the players order
 * @param {Number} rounds rounds done until now
 * @param {Number} players
 * @returns {Object} the status for the next round
 */
function getNextRoundStatus(rounds, players) {
  return {
    cardsDealt: getCardsDealtNextRound(rounds, players),
    playersOrder: getPlayersOrderNextRound(rounds, players)
  }
}

/**
 * Calculates the given points for a round, given the bet and result
 * @param {Number} askedRounds
 * @param {Number} didRounds
 * @returns {Number}
 */
function calculateRoundPoints(askedRounds, didRounds) {
  return askedRounds === didRounds
    ? 10 + didRounds * 5
    : - Math.abs(askedRounds - didRounds) * 5
}
export {
  getNextRoundStatus,
  calculateRoundPoints
}