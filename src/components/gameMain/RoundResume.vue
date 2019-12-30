<template>
  <div class="view-container">
    <last-round-table :round="lastRound" :previous-round="previousRound"/>
    <ui-button
      color="primary"
      v-on:click="clickOk"
    >
      Listo
    </ui-button>
  </div>
</template>
<script>
import { UiButton } from 'keen-ui';
import LastRoundTable from './LastRoundTable'
import * as r from '../../utils/rules'

export default {
  name: 'RoundResume',
  components: {
    UiButton,
    LastRoundTable,
  },
  data() {
    return {
      lastRound: {},
      previousRound: {}
    }
  },
  mounted() {
    const rounds = this.$ls.get('rounds')
    // remove "last" property
    // eslint-disable-next-line no-unused-vars
    const {last, ...rest} = rounds[rounds.length - 1]
    this.lastRound = rest
    this.previousRound = rounds[rounds.length - 2] || {}
  },
  methods: {
    clickOk() {
      const rounds = this.$ls.get('rounds')
      const players = this.$ls.get('players')
      const maxRounds = r.getMaxRounds(players.length)
      this.$ls.set('roundStatus', r.getNextRoundStatus(rounds.length, players.length))
      if (rounds === maxRounds) {
        this.$router.push({name: 'endGame'})
      } else {
        this.$router.push({name: 'deal'})
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.ui-button {
  margin-top: auto;
}
</style>