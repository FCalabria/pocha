<template>
  <div class="view-container">
    <p class="text-huge">{{dealer}}</p>
    <p>{{dinamicText.deals}} <span class="max-bet">{{cardsDealt}}</span> {{dinamicText.card}}</p>
    <ui-button v-on:click="startBets" color="primary">Hecho</ui-button>
  </div>
</template>
<script>
import {UiButton} from 'keen-ui'
export default {
  name: 'GameDeal',
  components: {
    UiButton
  },
  data() {
    return {
      dealer: '',
      cardsDealt: 0,
    }
  },
  computed: {
    dinamicText() {
      return this.cardsDealt === 1
      ? {deals: 'reparte', card: 'carta'}
      : {deals: 'reparten', card: 'cartas'}
    }
  },
  mounted () {
    const roundStatus = this.$ls.get('roundStatus')
    const players = this.$ls.get('players')
    this.dealer = players[roundStatus.playersOrder[players.length - 1]]
    this.cardsDealt = roundStatus.cardsDealt
  },
  methods: {
    startBets() {
      this.$router.push({name: 'bet'})
    }
  }
}
</script>
<style lang="scss" scoped>
.view-container {
  justify-content: center;
}
.max-bet {
  font-weight: 600;
  font-size: 2rem;
}
.text-huge {
  margin: 0;
}
</style>