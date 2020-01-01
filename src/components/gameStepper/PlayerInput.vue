<template>
  <div class="player-input">
      <ui-textbox
        v-model="currentPlayer"
        :maxlength="25"
        :floatingLabel="true"
        :enforceMaxlength="true"
        :autofocus="true"
      >
        Nuevo jugador
      </ui-textbox>
      <ui-icon-button
        icon="add"
        color="primary"
        aria-label="Añadir jugador"
        :disabled="currentPlayer.length === 0"
        v-on:click="addPlayer"
      />
    </div>
</template>
<script>
import UiTextbox from 'keen-ui/lib/UiTextbox';
import UiIconButton from 'keen-ui/lib/UiIconButton';
export default {
  name: 'PlayerInput',
  components: {
    UiTextbox,
    UiIconButton,
  },
    data () {
    return {
      currentPlayer: ''
    }
  },
  methods: {
    addPlayer() {
      this.$emit('addPlayer', {player: this.currentPlayer})
      this.currentPlayer = ''
    }
  }
}
</script>
<style lang="scss" scoped>
.player-input {
  display: flex;
  align-items: baseline;
  .ui-textbox {
    flex: 1 0 auto;
  }
}
</style>