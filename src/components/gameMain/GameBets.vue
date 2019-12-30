<template>
  <div class="cards-container" ref="scroller">
    <div v-for="(player, i) in sortedPlayers" :key="i" class="card" ref="card">
      <ui-icon-button
        size="large"
        icon="navigate_before"
        aria-label="anterior"
        v-if="i !== 0"
        v-on:click="toPrevPlayer"
      />
      <bet-card-content class="card-content" :player="player" :max-bet="maxBet"/>
      <ui-icon-button
        size="large"
        icon="navigate_next"
        aria-label="siguiente"
        v-if="i !== players.length - 1"
        v-on:click="toNextPlayer"
      />
    </div>
  </div>
</template>
<script>
import {UiIconButton} from 'keen-ui'
import BetCardContent from './BetCardContent'

export default {
  name: 'GameBets',
  components: {
    UiIconButton,
    BetCardContent,
  },
  data() {
    return {
      players: [],
      maxBet: 0
    }
  },
  computed: {
    sortedPlayers() {
      // TODO sort with correct bet order
      return this.players
    }
  },
  mounted() {
    this.players = this.$ls.get('players')
    const round = this.$ls.get('roundStatus')
    this.maxBet = round.cardsDealt
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
</style>