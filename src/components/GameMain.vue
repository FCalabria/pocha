<template>
  <div class="view-container">
    <view-status :players="players"/>
    <!-- Sub view for current step (deal, ask, play, enter results) -->
  </div>
</template>

<script>
import ViewStatus from './gameMain/ViewStatus'
export default {
  name: 'gameMain',
  components: {
    ViewStatus
  },
  data() {
    return {
      players: [],
    }
  },
  mounted() {
    this.players = this.$ls.get('players')
  },
}
</script>