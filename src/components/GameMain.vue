<template>
  <div class="view-container">
    <!-- <view-status :players="players"/> -->
    <router-view></router-view>
  </div>
</template>

<script>
// import ViewStatus from './gameMain/ViewStatus'
export default {
  name: 'gameMain',
  // components: {
  //   ViewStatus
  // },
  data() {
    return {
      players: [],
    }
  },
  mounted() {
    this.players = this.$ls.get('players')
    // this.$router.push({name: 'bet'})
  },
}
</script>