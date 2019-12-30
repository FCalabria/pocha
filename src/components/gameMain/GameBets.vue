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
          :invalid-bet="getInvalidBet(i, player)"
          :bet="bets[player]"
          v-on:changeBet="changeBet"
        />
        <ui-icon-button
          size="large"
          icon="navigate_next"
          aria-label="siguiente"
          v-if="i !== players.length - 1"
          v-on:click="toNextPlayer"
        />
      </div>
    </div>
    <p>Se {{dinamicText.play}} <span class="max-bet">{{maxBet}}</span> {{dinamicText.card}}</p>
    <ok-button v-on:click="startRound" :disabled="getInvalidBet(players.length - 1, lastPlayer)"/>
  </div>
</template>
<script>
import {UiIconButton} from 'keen-ui'
import BetCardContent from './BetCardContent'
import OkButton from '../microComponents/OkButton'

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
      bets: {},
    }
  },
  computed: {
    sortedPlayers() {
      return this.playersOrder.map(playerIndex => this.players[playerIndex])
    },
    lastPlayer() {
      return this.sortedPlayers[this.sortedPlayers.length - 1]
    },
    dinamicText() {
      return this.maxBet === 1
      ? {play: 'juega', card: 'carta'}
      : {play: 'juegan', card: 'cartas'}
    },
  },
  mounted() {
    this.players = this.$ls.get('players')
    const round = this.$ls.get('roundStatus')
    this.playersOrder = round.playersOrder
    this.maxBet = round.cardsDealt
    this.bets = this.players.reduce((acc, player) => {
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
      // const roundStatus = this.$ls.get('roundStatus')
      // roundStatus.status = 'play'
      // this.$ls.set('roundStatus', roundStatus)
      this.$router.push({name: 'play'})
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