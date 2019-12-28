<template>
  <div id="app">
    <game-stepper v-if="createGame"></game-stepper>
    <game-main v-else-if="gameReady"></game-main>
    <main-screen v-else></main-screen>
  </div>
</template>

<script>

import MainScreen from './components/MainScreen'
import GameStepper from './components/GameStepper'
import GameMain from './components/GameMain'

export default {
  name: 'app',
  components: {
    MainScreen,
    GameStepper,
    GameMain,
  },
  data() {
    const status = this.$ls.get('gameStatus') || {}
    return {
      createGame: status.started === true && status.ready !== true,
      gameReady: status.ready === true
    }
  },
  mounted() {
    this.$ls.on('gameStatus', (newStatus = {}) => {
      this.createGame = newStatus.started === true && status.ready !== true
      this.gameReady = newStatus.ready === true
    })
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
*,
*::before,
*::after {
    box-sizing: border-box;
}

html {
    font-size: 100%;
}
</style>
