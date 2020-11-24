import * as rules from '@/utils/rules'

describe('Rules', () => {
  describe('calculateRoundPoints', () => {
    const {calculateRoundPoints} = rules
    it('should not fail if any of the args is 0', () => {
      expect(calculateRoundPoints.bind(0, 0)).not.toThrow()
    })
    it.each([
      [0, 10],
      [1, 15],
      [2, 20],
      [6, 40],
    ])('should return 10 + 5 per round if both values are the same (test %#)', (value, result) => {
      expect(calculateRoundPoints(value, value)).toEqual(result);
    })
    it.each([
      [0, 1, -5],
      [0, 2, -10],
      [1, 0, -5],
      [1, 2, -5],
      [2, 8, -30],
      [5, 0, -25],
    ])('should return -5 * the difference if the values are different (test %#)', (asked, done, result) => {
      expect(calculateRoundPoints(asked, done)).toEqual(result);
    })
  })
  describe('getMaxRounds', () => {
    const {getMaxRounds} = rules
    it.each([
      [2, 42],
      [3, 31],
      [4, 28],
      [5, 27],
      [6, 26],
    ])('should the correct number of rounds for %i players', (players, rounds) => {
      expect(getMaxRounds(players)).toEqual(rounds)
    })
  })
  describe('getNextRoundStatus', () => {
    const {getNextRoundStatus} = rules
    it('should return an object with cardsDealt and playersOrder props', () => {
      expect(getNextRoundStatus(3, 4)).toMatchObject({
        cardsDealt: expect.any(Number),
        playersOrder: expect.any(Array)
      })
    })
    it.each([
      [1, 2, 1],
      [2, 2, 2],
      [0, 3, 1],
      [13, 3, 12],
      [16, 3, 13],
      [18, 3, 11],
      [29, 3, 1],
      [0, 4, 1],
      [3, 4, 1],
      [8, 4, 6],
      [13, 4, 10],
      [16, 4, 9],
      [24, 4, 1],
      [4, 5, 1],
      [10, 5, 7],
      [15, 5, 8],
      [19, 5, 4],
      [25, 5, 1],
    ])('should set the cards dealt after the %d rounds with %d players', (round, players, cards) => {
      expect(getNextRoundStatus(round, players).cardsDealt).toEqual(cards)
    })
    it.each([
      []
    ])('should set the players order after %d rounds with % players', (round, players, order) => {
      expect(getNextRoundStatus(round, players)).toEqual()
    })
  })
})
