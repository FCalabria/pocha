<template>
  <table>
    <thead>
      <td>Jugador</td>
      <td colspan="2">Puntos</td>
    </thead>
    <tr v-for="(data, player) in round" :key="player">
      <td>{{player}}</td>
      <td>{{data.points}}</td>
      <td><up-down :difference="getPointsDifference(player, data.points)" /></td>
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
    text-align: left;
    width: 100%;
    padding: 1rem;
  }
  tr {
    font-size: 1.3rem;
    & td {
      padding-top: .5rem;
      &:first-child {
        font-weight: 600;
        padding-right: .5rem;
      }
      &:last-child {
        color: $md-dark-text-hint;
      }
    }
    &:not(:last-of-type) td {
      border-bottom: .0625rem solid rgba(0,0,0,.12);
      padding-bottom: .5rem;
    }
  }
</style>