import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import Vuetify from 'vuetify/lib';
import VuetifyStyle from 'vuetify/src/stylus/app.styl';
import Axios from 'axios';
import VueAxios from 'vue-axios';
import VueLazyload from 'vue-lazyload';

import Env from './main-env.json';
import Style from './main-style.scss';

import App from './vue/App.vue';
import Page1 from './vue/Page1.vue';
import Page2 from './vue/Page2.vue';

Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(Vuetify);
Vue.use(VueAxios, Axios);
Vue.use(VueLazyload);

const store = new Vuex.Store({
  state: {
    message: Env.greeting
  },
  getters: {
    message: state => state.message
  },
  mutations: {
    message(state, payload) {
      state.message = payload.message;
    }
  },
  actions: {
    message({commit}, message) {
      commit('message', {message});
    }
  }
});

const router = new VueRouter({
  routes: [
    { path: '/page1', component: Page1 },
    { path: '/page2', component: Page2 }
  ]
});

const app = new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
});
