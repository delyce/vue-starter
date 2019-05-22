<template>
  <div>
    <p>paeg2 {{ message }}</p>
    <input type="button" value="Get JSON" @click="getJSON" />
  </div>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';
  import axios from 'axios';

  @Component
  export default class Page2 extends Vue {
    private get message(): string {
      return this.$store.getters.message;
    }
    private getJSON() {
      this.$http.get('/get/axiostest')
        .then((response: AxiosResponse) => {
          this.$store.dispatch('message', response.data.message);
        })
        .catch((error: AxiosError) => {
          this.$store.dispatch('message', error.message);
        });
    }
  }
</script>
