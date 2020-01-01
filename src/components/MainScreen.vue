<template>
  <div class="view-container">
    <ui-button v-on:click="startGame" color="primary">Iniciar partida</ui-button>
  </div>
</template>

<script>

import UiButton from 'keen-ui/lib/UiButton';
export default {
  name: 'mainScreen',
  components: {
    UiButton,
  },
  methods: {
    startGame () {
      this.$ls.clear()
      this.$ls.set('players', [])
      this.$router.push({name: 'configureGame'})
    }
  }
}
</script>
<style lang="scss" scoped>
.view-container {
  justify-content: center;
}
</style>

