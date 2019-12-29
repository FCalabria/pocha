<template>
  <div class="cards-container" ref="scroller">
    <div v-for="(player, i) in players" :key="i" class="card" ref="card">
      <ui-icon-button
        size="large"
        icon="navigate_before"
        aria-label="anterior"
        v-if="i !== 0"
        v-on:click="toPrevPlayer"
      />
      <div class="card-content">{{player}}</div>
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
export default {
  name: 'GameBets',
  components: {
    UiIconButton
  },
  data() {
    return {
      players: []
    }
  },
  mounted() {
    this.players = this.$ls.get('players')
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
  scroll-snap-type: y mandatory;
}
.card {
  flex: 1 0 100%;
  margin: 0 .5rem;
  display: grid;
  grid-template-columns: 3rem 1fr 3rem;
  align-items: center;
  scroll-snap-align: center;
  scroll-snap-stop: always;
}
.card-content {
  grid-column: 2 / span 1;
}
</style>