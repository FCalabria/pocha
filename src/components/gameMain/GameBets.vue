<template>
  <div class="view-container">
    <players-carousel
      :players="sortedPlayers"
    >
      <template v-slot="slotProps">
        <bet-card-content
          class="card-content"
          :player="slotProps.player"
          :max-bet="maxBet"
          :invalid-bet="getInvalidBet(slotProps.playerOrder, slotProps.player)"
          :bet="bets[slotProps.player]"
          v-on:changeBet="changeBet"
        >
          <p>quiere</p>
        </bet-card-content>
      </template>
    </players-carousel>
    <p>Se {{dinamicText.play}} <span class="max-bet">{{maxBet}}</span> {{dinamicText.card}}</p>
    <ok-button v-on:click="startRound" :disabled="getInvalidBet(players.length - 1, lastPlayer)"/>
  </div>
</template>
<script>
import BetCardContent from './BetCardContent'
import PlayersCarousel from '../microComponents/PlayersCarousel'
import OkButton from '../microComponents/OkButton'
import {inRoundInfo} from '../../mixins'

export default {
  name: 'GameBets',
  components: {
    BetCardContent,
    PlayersCarousel,
    OkButton
  },
  mixins: [inRoundInfo],
  data() {
    return {
      bets: {},
    }
  },
  computed: {
    dinamicText() {
      return this.maxBet === 1
      ? {play: 'juega', card: 'carta'}
      : {play: 'juegan', card: 'cartas'}
    },
  },
  mounted() {
    this.bets = this.players.reduce((acc, player) => {
      acc[player] = 0
      return acc
    }, {})
  },
  methods: {
    changeBet(data) {
      this.bets[data.player] = data.newBet
    },
    getInvalidBet(playerOrder, player) {
      if (playerOrder === this.players.length - 1) {
        const validBets = Object.entries(this.bets)
          .reduce((total, [currentPlayer, currentBet]) => currentPlayer !== player 
            ? total + currentBet
            : total, 0)
        return this.maxBet - validBets === this.bets[player]
      }
    },
    startRound() {
      const rounds = this.$ls.get('rounds')
      let calculatedBets = {...this.bets}
      for (const player in calculatedBets) {
        const askedRounds = calculatedBets[player];
        calculatedBets[player] = { askedRounds }
      }
      const nextRound = {last: this.lastPlayer, ...calculatedBets}
      rounds.push(nextRound)
      this.$ls.set('rounds', rounds)
      this.$router.push({name: 'play'})
    }
  }
}
</script>
<style lang="scss" scoped>
.card-content {
  grid-column: 2 / span 1;
  margin-bottom: 4rem;
}
.max-bet {
  font-weight: 600;
  font-size: 2rem;
}
</style>