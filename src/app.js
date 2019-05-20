import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import Vuetify from 'vuetify/lib';
import axios from 'axios'
import VueAxios from 'vue-axios'

import App from './vue/App.vue';
import Page1 from './vue/Page1.vue';
import Page2 from './vue/Page2.vue';

//import 'vuetify/dist/vuetify.css';
import 'vuetify/src/stylus/app.styl';
//import 'typeface-noto-sans';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import './app-style.scss';

Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(Vuetify);
Vue.use(VueAxios, axios);

import VueLazyload from 'vue-lazyload';
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: './assets/img/error.png',
  loading: './assets/img/loading.gif',
  attempt: 1
});

const store = new Vuex.Store({
  state: {
    message: 'Hello Vuex'
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
