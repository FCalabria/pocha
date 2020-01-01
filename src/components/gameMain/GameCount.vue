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
          :bet="done[slotProps.player]"
          v-on:changeBet="changeBet"
        >
          <p>hizo</p>
        </bet-card-content>
      </template>
    </players-carousel>
    <div v-show="!isValidCount">
      <p>Asignadas {{totalDone}} de {{maxBet}}</p>
    </div>
    <ok-button v-on:click="finishRound" v-show="isValidCount"/>
  </div>
</template>
<script>
import PlayersCarousel from '../microComponents/PlayersCarousel'
import BetCardContent from './BetCardContent'
import OkButton from '../microComponents/OkButton'
import {inRoundInfo} from '../../mixins'
import * as r from '../../utils/rules'

export default {
  name: 'GameBets',
  components: {
    PlayersCarousel,
    BetCardContent,
    OkButton
  },
  mixins: [inRoundInfo],
  data() {
    return {
      done: {},
    }
  },
  computed: {
    totalDone() {
      return Object.values(this.done).reduce((acc, playerDone) => acc + playerDone, 0)
    },
    isValidCount() {
      return this.maxBet === this.totalDone
    }
  },
  mounted() {
    this.done = this.players.reduce((acc, player) => {
      acc[player] = 0
      return acc
    }, {})
  },
  methods: {
    changeBet(data) {
      this.done[data.player] = data.newBet
    },
    finishRound() {
      const rounds = this.$ls.get('rounds')
      const lastRound = rounds[rounds.length -1]
      for (const player in this.done) {
        const playerLastRound = lastRound[player]
        playerLastRound.didRounds = this.done[player]
        const previousPoints = rounds.length > 1
          ? rounds[rounds.length - 2][player].points
          : 0
        playerLastRound.points = r.calculateRoundPoints(playerLastRound.askedRounds, playerLastRound.didRounds) + previousPoints
      }
      this.$ls.set('rounds', rounds)
      this.$router.push({name: 'roundResume'})
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