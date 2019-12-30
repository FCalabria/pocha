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
        v-on:click="bet++"
        :disabled="bet >= maxBet"
    />
    <p class="bet">{{bet}}</p>
    <ui-icon-button
        type="primary"
        color="primary"
        size="large"
        icon="remove"
        aria-label="menos"
        v-on:click="bet--"
        :disabled="bet <= 0"
    />
    <p>de <span class="max-bet">{{maxBet}}</span> manos</p>
  </div>
</template>
<script>
// TODO: manage invalid bet
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
    }
  },
  data () {
    return {
      bet: 0
    }
  },
}
</script>
<style lang="scss" scoped>
.bet {
  font-size: 8rem;
  margin: 0;
}
.max-bet {
  font-weight: 600;
  font-size: 2rem;
}
</style>