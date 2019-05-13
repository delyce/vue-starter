import Vue from 'vue';
import VueRouter from 'vue-router';

import App from './vue/App.vue';
import Page1 from './vue/Page1.vue';
import Page2 from './vue/Page2.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    { path: '/page1', component: Page1 },
    { path: '/page2', component: Page2 }
  ]
});

const app = new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
