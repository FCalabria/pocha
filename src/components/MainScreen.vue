<template>
  <div class="view-container">
    <ui-button v-if="gameInProgress" v-on:click="resumeGame" color="primary">Recuperar partida</ui-button>
    <ui-button v-on:click="clickStart" color="primary" :type="gameInProgress ? 'secondary' : 'primary'">Iniciar partida</ui-button>
    <ui-confirm
      title="Confirmar"
      ref="startConfirm"
      confirmButtonText="Sí"
      denyButtonText="Cancelar"
      @confirm="startGame"
      @deny="hideConfirm"
    >
      Esto borrara los datos de la partida a medias, ¿estás seguro?
    </ui-confirm>
  </div>
</template>

<script>
import { getMaxRounds } from "../utils/rules";
import UiButton from "keen-ui/lib/UiButton";
import UiConfirm from "keen-ui/lib/UiConfirm";
export default {
  name: "mainScreen",
  components: {
    UiButton,
    UiConfirm
  },
  data() {
    return {
      gameInProgress: false,
    };
  },
  mounted() {
    const rounds = this.$ls.get("rounds");
    const players = this.$ls.get("players");
    if (rounds && rounds.length && rounds.length !== getMaxRounds(players.length)) {
      this.gameInProgress = true;
    }
  },
  methods: {
    clickStart() {
      if (this.gameInProgress) {
        this.showConfirm()
      } else {
        this.startGame()
      }
    },
    startGame() {
      this.$ls.clear();
      this.$ls.set("players", []);
      this.$router.push({ name: "configureGame" });
    },
    resumeGame() {
      const rounds = this.$ls.get("rounds");
      const lastRound = rounds[rounds.length -1]
      const somePlayer = Object.values(lastRound)[0]
      if(somePlayer.hasOwnProperty('askedRounds') && !somePlayer.hasOwnProperty('didRounds')) {
        this.$router.push({name: 'play'})
      } else {
        this.$router.push({name: 'deal'})
      }
    },
    hideConfirm() {
      this.$refs.startConfirm.close()
    },
    showConfirm() {
      this.$refs.startConfirm.open()
    }
  }
};
</script>
<style lang="scss" scoped>
.ui-button + .ui-button {
  margin-top: 1.6rem;
}
.view-container {
  justify-content: center;
}
</style>

