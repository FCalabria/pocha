<template>
  <div class="view-container">
    <h1>Jugadores:</h1>
    <player-input v-on:addPlayer="addPlayer"/>
    <div>
      <player-preview
        v-for="(player, i) in players"
        v-on:remove="removePlayer"
        v-on:moveUp="moveUpPlayer"
        :key="i"
        :player="player"
        :order="i + 1"
      />
    </div>
    <ok-button v-if="players.length >= 2" v-on:click="startGame"/>
  </div>
</template>

<script>
import PlayerInput from './gameStepper/PlayerInput'
import PlayerPreview from './gameStepper/PlayerPreview'
import OkButton from './microComponents/OkButton'
import * as r from '../utils/rules'
export default {
  name: 'gameStepper',
  components: {
    OkButton,
    PlayerInput,
    PlayerPreview,
  },
  data () {
    return {
      players: [],
    }
  },
  mounted() {
    this.players = this.$ls.get('players')
  },
  methods: {
    addPlayer(data) {
      this.players.push(data.player);
    },
    removePlayer(data) {
      const player = data.player;
      const i = this.players.findIndex((current) => current === player)
      this.players.splice(i, 1);
    },
    moveUpPlayer(data) {
      const player = data.player;
      const prevIndex = this.players.findIndex((current) => current === player) - 1
      if (prevIndex <= -1) {
        return;
      }
      this.players.splice(prevIndex, 2, player, this.players[prevIndex])
    },
    startGame() {
      this.$ls.set('rounds', [])
      this.$ls.set('players', this.players)
      this.$ls.set('gameStatus', {started: true, ready: true})
      this.$ls.set('roundStatus', r.getNextRoundStatus(0, this.players.length))
      this.$router.push({name: 'deal'})
    }
  }
}
</script>