<template>
  <div class="view-container">
    <div class="cards-container" ref="scroller">
      <div v-for="(player, i) in sortedPlayers" :key="i" class="card" ref="card">
        <ui-icon-button
          size="large"
          icon="navigate_before"
          aria-label="anterior"
          v-if="i !== 0"
          v-on:click="toPrevPlayer"
        />
        <bet-card-content
          class="card-content"
          :player="player"
          :max-bet="maxBet"
          :bet="done[player]"
          v-on:changeBet="changeBet"
        >
          <p>hizo</p>
        </bet-card-content>
        <ui-icon-button
          size="large"
          icon="navigate_next"
          aria-label="siguiente"
          v-if="i !== players.length - 1"
          v-on:click="toNextPlayer"
        />
      </div>
    </div>
    <div v-show="!isValidCount">
      <p>Asignadas {{totalDone}} de {{maxBet}}</p>
    </div>
    <ok-button v-on:click="finishRound" v-show="isValidCount"/>
  </div>
</template>
<script>
import UiIconButton from 'keen-ui/lib/UiIconButton'
import BetCardContent from './BetCardContent'
import OkButton from '../microComponents/OkButton'
import * as r from '../../utils/rules'

export default {
  name: 'GameBets',
  components: {
    UiIconButton,
    BetCardContent,
    OkButton
  },
  data() {
    return {
      players: [],
      playersOrder: [],
      maxBet: 0,
      done: {},
    }
  },
  computed: {
    sortedPlayers() {
      return this.playersOrder.map(playerIndex => this.players[playerIndex])
    },
    lastPlayer() {
      return this.sortedPlayers[this.sortedPlayers.length - 1]
    },
    totalDone() {
      return Object.values(this.done).reduce((acc, playerDone) => acc + playerDone, 0)
    },
    isValidCount() {
      return this.maxBet === this.totalDone
    }
  },
  mounted() {
    this.players = this.$ls.get('players')
    const round = this.$ls.get('roundStatus')
    this.playersOrder = round.playersOrder
    this.maxBet = round.cardsDealt
    this.done = this.players.reduce((acc, player) => {
      acc[player] = 0
      return acc
    }, {})
  },
  methods: {
    toPrevPlayer() {
      const cardWidth = this.$refs.card[0].clientWidth;
      this.$refs.scroller.scrollBy({left: -cardWidth, behaviour: 'smooth'})
    },
    toNextPlayer() {
      const cardWidth = this.$refs.card[0].clientWidth;
      this.$refs.scroller.scrollBy({left: cardWidth, behaviour: 'smooth'})
    },
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
.cards-container {
  height: 100%;
  display: flex;
  overflow-y: auto;
  scroll-snap-type: x mandatory;
}
.card {
  flex: 1 0 100%;
  min-width: 100%;
  margin: 0 .5rem;
  display: grid;
  grid-template-columns: 3rem 1fr 3rem;
  align-items: center;
  scroll-snap-align: center;
  scroll-snap-stop: always;
  &:first-child {
    margin-left: 0;
  }
  &:last-child {
    margin-right: 0;
  }
}
.card-content {
  grid-column: 2 / span 1;
  margin-bottom: 4rem;
}
.max-bet {
  font-weight: 600;
  font-size: 2rem;
}
</style>