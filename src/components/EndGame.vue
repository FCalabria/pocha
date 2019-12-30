<template>
  <div class="view-container">
    <p>Ha ganado <br/><span class="text-huge">{{winner}}</span> </p>
    <img src="../assets/images/trofeo.svg"/>
    <last-round-table :round="lastRound" :previous-round="previousRound"/>
    <ok-button v-on:click="restart"/>
  </div>
</template>
<script>
import OkButton from './microComponents/OkButton'
import LastRoundTable from './microComponents/LastRoundTable'
export default {
  name: 'EndGame',
  components: {
    OkButton,
    LastRoundTable
  },
  data() {
    return {
      winner: 'Alguien',
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
    restart() {
      this.$router.push({name: 'main'})
    }
  }
}
</script>
<style lang="scss" scoped>
img {
  max-width: 60%;
  align-self: center;
  margin: 2rem 0;
}
</style>