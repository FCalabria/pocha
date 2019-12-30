<template>
  <div class="view-container">
    <h2>Sale {{firstPlayer}}</h2>
    <ui-button v-on:click="endRound" color="primary">Ronda acabada</ui-button>
  </div>
</template>
<script>
import {UiButton} from 'keen-ui'
export default {
  name: 'GameInPlay',
  components: {
    UiButton
  },
  data() {
    return {
      firstPlayer: '',
    }
  },
  mounted () {
    const roundStatus = this.$ls.get('roundStatus')
    const players = this.$ls.get('players')
    this.firstPlayer = players[roundStatus.playersOrder[0]]
  },
  methods: {
    endRound() {
      this.$router.push({name: 'count'})
    }
  }
}
</script>
<style lang="scss" scoped>
.view-container {
  justify-content: center;
}
</style>