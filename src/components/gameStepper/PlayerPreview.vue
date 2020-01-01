<template>
  <div class="player-preview">
    <ui-icon-button
      icon="arrow_upward"
      aria-label="Ordenar (subir)"
      type="secondary"
      color="primary"
      :disabled="order === 1"
      v-on:click="moveUp"
    />
    <span class="order" v-if="order">{{order}}&nbsp;</span>
    <span>{{player}}</span>
    <ui-icon-button
      class="btn-remove"
      icon="clear"
      aria-label="Eliminar"
      type="secondary"
      color="red"
      v-on:click="remove"
    />
  </div>
</template>
<script>
import UiIconButton from 'keen-ui/lib/UiIconButton'
export default {
  name: 'PlayerPreview',
  components: {
    UiIconButton,
  },
  props: {
    player: {
      type: String,
      required: true,
    },
    order: Number,
  },
  methods: {
    remove() {
      this.$emit('remove', {player: this.player});
    },
    moveUp() {
      this.$emit('moveUp', {player: this.player})
    }
  }
}
</script>
<style lang="scss" scoped>
.player-preview {
  text-align: left;
  border-bottom: .0625rem solid rgba(0,0,0,.12);
  height: 3.5rem;
  display: flex;
  align-items: center;
}
.ui-icon:not(:last-child) {
  margin-right: 1rem;
}
.btn-remove {
  margin-left: auto;
}
.order {
  font-weight: 600;
  margin-right: .5rem;
}
</style>