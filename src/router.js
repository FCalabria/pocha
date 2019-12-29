import VueRouter from 'vue-router'
import Vue from 'vue'
import MainScreen from './components/MainScreen'
import GameStepper from './components/GameStepper'
import GameMain from './components/GameMain'

Vue.use(VueRouter)

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
      path: '/play'
    },
  ]
})