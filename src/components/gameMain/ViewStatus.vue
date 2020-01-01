<template>
  <ui-collapsible title="¿Cómo vamos?" >
    <table class="table">
      <tr v-for="(player, i) in players" :key="i">
        <td>{{player}}</td>
        <td>puntos</td>
      </tr>
    </table>
  </ui-collapsible>
</template>
<script>
import UiCollapsible from 'keen-ui/lib/UiCollapsible';
export default {
  name: 'ViewStatus',
  components: {
    UiCollapsible,
  },
  props: {
    players: {
      type: Array,
      required: true
    }
  }
}
</script>
<style lang="scss" scoped>
  tr {
    &:first-of-type td {
      padding-top: 0
    }
  }
</style>