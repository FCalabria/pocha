<template>
  <table class="table table--with-header">
    <thead>
      <td>Jugador</td>
      <td colspan="2">Puntos</td>
    </thead>
    <tr v-for="(data, player) in round" :key="player">
      <td>{{player}}</td>
      <td>{{data.points}}</td>
      <td class="trend" v-if="trend"><up-down :difference="getPointsDifference(player, data.points)" /></td>
    </tr>
  </table>
</template>
<script>
import UpDown from '../microComponents/UpDown'
export default {
  name: 'LastRoundTable',
  components: {
    UpDown
  },
  props: {
    round: {
      type: Object,
      required: true
    },
    previousRound: {
      type: Object,
      required: true
    },
    trend: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    getPointsDifference(player, currentPoints) {
      const previousPoints = (this.previousRound[player] || {}).points
      return currentPoints - (previousPoints || 0)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~keen-ui/src/styles/md-colors.scss";
  table {
    padding: 1rem;
  }
  tr {
    font-size: 1.3rem;
    td {
      &:first-child {
        font-weight: 600;
      }
      &.trend {
        color: $md-dark-text-hint;
      }
    }
  }
</style>