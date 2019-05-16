<template>
  <div>
    <p>page1 {{ greeting }}</p>
    <input type="text" :value="message" @input="doUpdate" />
  </div>
</template>

<script lang="ts">
  import Config from '../config.json';
  import { Vue, Component } from 'vue-property-decorator';

  @Component
  export default class Page1 extends Vue {
    private greeting: string = Config.greeting;

    private get message(): string {
      return this.$store.getters.message;
    }

    private doUpdate(event: any) {
      this.$store.dispatch('message', event.target.value);
    }
  }
</script>
