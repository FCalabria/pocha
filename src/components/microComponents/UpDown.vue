<template>
  <span>
      <ui-icon
        :icon="`trending_${trend}`"
        :class="{
          'text-green': trend === 'up',
          'text-red': trend === 'down',
          'text-blue': trend === 'flat',
        }"
      />
      {{difference}}
  </span>
</template>
<script>
import UiIcon from 'keen-ui/lib/UiIcon';
export default {
  name: 'UpDown',
  components: {
    UiIcon
  },
  props: {
    difference: {
      type: Number,
      required: true
    }
  },
  computed: {
    trend() {
      return this.difference === 0
        ? 'flat'
        : this.difference > 0
          ? 'up'
          : 'down'
    }
  }
}
</script>