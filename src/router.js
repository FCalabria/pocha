import VueRouter from 'vue-router'
import Vue from 'vue'
import MainScreen from './components/MainScreen'
import GameStepper from './components/GameStepper'
import GameMain from './components/GameMain'
import GameBets from './components/gameMain/GameBets'
import GameInPlay from './components/gameMain/GameInPlay'

Vue.use(VueRouter)
// TODO: Add navigation guards that redirect depending on the status
export default new VueRouter({
  routes: [
    {
      name: 'main',
      component: MainScreen,
      path: '/main'
    },
    {
      name: 'configureGame',
      component: GameStepper,
      path: '/configure'
    },
    {
      name: 'playGame',
      component: GameMain,
      path: '/play',
      children: [
        {
          name: 'bet',
          component: GameBets,
          path: 'bet',
        },
        {
          name: 'playing',
          component: GameInPlay,
          path: 'playing'
        },
        {
          path: '',
          redirect: 'bet'
        }
      ]
    },
  ]
})