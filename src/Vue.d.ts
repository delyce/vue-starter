import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

declare module 'vue/types/vue' {

  interface Vue {
    $store: Vuex.Store,
    $http: AxiosInstance
  }
}
