<template>
  <v-layout>
    <v-btn @click="getJSON">GET JSON</v-btn>
  </v-layout>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';

  @Component
  export default class Page2 extends Vue {
    private getJSON() {
      this.$http.get('/get.json')
        .then((response) => {
          this.$store.dispatch('message', response.data.message);
        })
        .catch((error) => {
          this.$store.dispatch('message', error.message);
        });
    }
  }
</script>

<style lang="scss" scoped>
  .layout {
    background: inline('../assets/img/internal.png') no-repeat;
  }
</style>
