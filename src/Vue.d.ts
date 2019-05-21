declare module 'vue/types/vue' {
  import Vue from 'vue';
  import Vuex from 'vuex';
  import axios from 'axios';

  interface Vue {
    $store: Vuex.Store,
    $http: AxiosInstance
  }
}

declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}
