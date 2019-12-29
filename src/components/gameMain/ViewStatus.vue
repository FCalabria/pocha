<template>
  <ui-collapsible title="¿Cómo vamos?" >
    <table>
      <tr v-for="(player, i) in players" :key="i">
        <td>{{player}}</td>
        <td>puntos</td>
      </tr>
    </table>
  </ui-collapsible>
</template>
<script>
import {UiCollapsible} from 'keen-ui'
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
  table {
    text-align: left;
    width: 100%;
  }
  tr {
    & td {
      padding-top: .5rem;
      &:first-child {
        padding-right: .5rem;
      }
    }
    &:first-of-type td {
      padding-top: 0
    }
    &:not(:last-of-type) td {
      border-bottom: .0625rem solid rgba(0,0,0,.12);
      padding-bottom: .5rem;
    }
  }
</style>