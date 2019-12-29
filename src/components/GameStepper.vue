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
    <ui-button
      class="btn-start"
      v-on:click="startGame"
      type="secondary"
      color="primary"
      v-if="players.length >= 2"
    >
      Listo
    </ui-button>
  </div>
</template>

<script>
import { UiButton } from 'keen-ui';
import PlayerInput from './gameStepper/PlayerInput'
import PlayerPreview from './gameStepper/PlayerPreview'
export default {
  name: 'gameStepper',
  components: {
    UiButton,
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
      this.$ls.set('players', this.players)
      this.$ls.set('gameStatus', {started: true, ready: true})
      this.$router.push({name: 'playGame'})
    }
  }
}
</script>
<style lang="scss" scoped>
.btn-start {
  margin-top: auto;
}
</style>