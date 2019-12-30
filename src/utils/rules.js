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
function getNextRoundStatus(rounds, players) {
  return {cardsDealt: getCardsDealtNextRound(rounds, players)}
}
export {
  getNextRoundStatus
}