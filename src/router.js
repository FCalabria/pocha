import VueRouter from 'vue-router'
import Vue from 'vue'
import MainScreen from './components/MainScreen'
import GameStepper from './components/GameStepper'
import GameMain from './components/GameMain'
import GameDeal from './components/gameMain/GameDeal'
import GameBets from './components/gameMain/GameBets'
import GameInPlay from './components/gameMain/GameInPlay'
import GameCount from './components/gameMain/GameCount'
import RoundResume from './components/gameMain/RoundResume'

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
          name: 'deal',
          component: GameDeal,
          path: 'deal'
        },
        {
          name: 'bet',
          component: GameBets,
          path: 'bet',
        },
        {
          name: 'play',
          component: GameInPlay,
          path: 'play'
        },
        {
          name: 'count',
          component: GameCount,
          path: 'count'
        },
        {
          name: 'roundResume',
          component: RoundResume,
          path: 'resume'
        },
        {
          path: '',
          redirect: 'deal'
        }
      ]
    },
    {
      path: '',
      redirect: '/main'
    }
  ],
})