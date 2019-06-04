<template>
  <v-layout>
    <v-text-field type="text" :value="message" @input="doUpdate" />
  </v-layout>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';

  @Component
  export default class Page1 extends Vue {
    private get message(): string {
      return this.$store.getters.message;
    }

    private doUpdate(e: Event) {
      if (e.target instanceof HTMLInputElement) {
        this.$store.dispatch('message', e.target.value);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .layout {
    background: resolve('../assets/img/external.png') no-repeat;
  }
</style>
