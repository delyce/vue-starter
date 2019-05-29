<template>
  <v-layout>
    <p>paeg2 {{ message }}</p>
    <v-btn @click="getJSON">Get JSON</v-btn>
    <v-btn @click="getJSON2">Get JSON2</v-btn>
  </v-layout>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';

  @Component
  export default class Page2 extends Vue {
    private get message(): string {
      return this.$store.getters.version + ': ' + this.$store.getters.message;
    }
    private getJSON() {
      this.$http.get('/get/axiostest')
        .then((response) => {
          this.$store.dispatch('message', response.data.message);
        })
        .catch((error) => {
          this.$store.dispatch('message', error.message);
        });
    }
    private getJSON2() {
      this.$http.get('/get/axiostest2')
        .then((response) => {
          this.$store.dispatch('message', response.data.message);
        })
        .catch((error) => {
          this.$store.dispatch('message', error.message);
        });
    }
  }
</script>
