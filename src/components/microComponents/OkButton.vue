<template>
    <ui-button
      type="secondary"
      color="primary"
      size="large"
      v-on:click="$emit('click')"
      :disabled="disabled"
    >
      Listo
    </ui-button>
</template>
<script>
import { UiButton } from 'keen-ui';
export default {
  name: 'OkButton',
  components: {
    UiButton,
  },
  props: {
    disabled: {
      type: Boolean,
      default: false,
    }
  }
}
</script>
<style lang="scss" scoped>
.ui-button {
  margin-top: auto;
}
</style>