<template>
  <p>page1 {{ greeting }}</p>
</template>

<script lang="ts">
  import Config from '../config.json';
  import { Vue, Component } from 'vue-property-decorator';

  console.log(Config);

  @Component
  export default class Page1 extends Vue {
    private greeting: string = Config.greeting;
  }
</script>
