<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  mounted() {
    const status = this.$ls.get('gameStatus') || {}
    const createGame = status.started === true && status.ready !== true
    const gameReady = status.ready === true
    let routeName = 'main'
    if (createGame) {
      routeName = 'configureGame'
    } else if (gameReady) {
      routeName = 'playGame'
    }
    this.$router.push({name: routeName})
  }
}
</script>

<style lang="scss">
@import './assets/styles/main.scss';
</style>
