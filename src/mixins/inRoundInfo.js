export default {
  data() {
    return {
      playersOrder: [],
      players: [],
      maxBet: 0,
    }
  },
  computed: {
    sortedPlayers() {
      return this.playersOrder.map(playerIndex => this.players[playerIndex])
    },
    lastPlayer() {
      return this.sortedPlayers[this.sortedPlayers.length - 1]
    },
  },
  mounted() {
    const round = this.$ls.get('roundStatus')
    this.playersOrder = round.playersOrder
    this.players = this.$ls.get('players')
    this.maxBet = round.cardsDealt
  },
}