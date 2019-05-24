<template>
  <div>
    <p>page1 {{ greeting }}</p>
    <v-text-field type="text" :value="message" @input="doUpdate" />
  </div>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';

  @Component
  export default class Page1 extends Vue {
    private greeting: string = '';

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
  p {
    backgournd: resolve('../assets/img/external-2.png') no-repeat;
  }
</style>
