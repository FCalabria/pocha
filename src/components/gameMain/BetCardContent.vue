<template>
  <div>
    <h2>{{player}}</h2>
    <p>quiere</p>
    <ui-icon-button
        type="primary"
        color="primary"
        size="large"
        icon="add"
        aria-label="más"
        v-on:click="increaseBet"
        :disabled="bet >= maxBet"
    />
    <p :class="['bet', 'text-huge', invalidBet === bet && 'text-red']">{{bet}}</p>
    <ui-icon-button
        type="primary"
        color="primary"
        size="large"
        icon="remove"
        aria-label="menos"
        v-on:click="decreaseBet"
        :disabled="bet <= 0"
    />
    <p>de <span class="max-bet">{{maxBet}}</span> manos</p>
  </div>
</template>
<script>
import {UiIconButton} from 'keen-ui'
export default {
  name: 'BetCardContent',
  components: {
    UiIconButton
  },
  props: {
    player: {
      type: String,
      required: true
    },
    maxBet: {
      type: Number,
      required: true,
    },
    bet: {
      type: Number,
      default: 0
    },
    invalidBet: {
      type: Number
    }
  },
  methods: {
    increaseBet() {
      this.$emit('changeBet', {newBet: this.bet + 1, player: this.player})
    },
    decreaseBet() {
      this.$emit('changeBet', {newBet: this.bet - 1, player: this.player})
    }
  }
}
</script>
<style lang="scss" scoped>
.bet {
  margin: 0;
}
.max-bet {
  font-weight: 600;
  font-size: 2rem;
}
</style>