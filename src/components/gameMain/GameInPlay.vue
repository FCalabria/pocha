<template>
  <div class="view-container">
    <h2>Sale {{firstPlayer}}</h2>
    <table class="table table--with-header">
      <thead>
        <td>Jugador</td>
        <td>Pedidas</td>
      </thead>
      <tr v-for="(player, i) in players" :key="i">
        <td>{{player}}</td>
        <td>{{getPlayerBet(player)}}</td>
      </tr>
    </table>
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
      players: []
    }
  },
  mounted () {
    const roundStatus = this.$ls.get('roundStatus')
    this.players = this.$ls.get('players')
    this.firstPlayer = this.players[roundStatus.playersOrder[0]]
  },
  methods: {
    endRound() {
      this.$router.push({name: 'count'})
    },
    getPlayerBet(player) {
      const rounds = this.$ls.get('rounds')
      return rounds[rounds.length - 1][player].askedRounds
    }
  }
}
</script>
<style lang="scss" scoped>
.view-container {
  justify-content: center;
}
table {
  padding: 1rem 0;
  tr {
    font-size: 1.3rem;
  }
}
</style>