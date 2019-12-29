import Vue from 'vue'
import Storage from 'vue-ls';
import 'keen-ui/dist/keen-ui.css';
import App from './App.vue'
import router from './router'

const options = {
  namespace: 'pocha__',
  name: 'ls',
  storage: 'local',
};

Vue.use(Storage, options);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
