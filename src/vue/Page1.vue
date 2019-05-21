<template>
  <div>
    <p>page1 {{ greeting }}</p>
    <input type="text" :value="message" @input="doUpdate" />
  </div>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';

  @Component
  export default class Page1 extends Vue {
    private greeting: string = 'Hello Page1';

    private get message(): string {
      return this.$store.getters.message;
    }

    private doUpdate(event: any) {
      this.$store.dispatch('message', event.target.value);
    }
  }
</script>

<style lang="scss" scoped>
  p {
    backgournd: resolve('../assets/img/external-2.png') no-repeat;
  }
</style>
