<template>
  <div>
    <p>{{ greeting }} World!</p>
    <div>
      <p>nested</p>
    </div>
    <div>
      <p class="vars">vars</p>
    </div>
  </div>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator'

  @Component
  export default class App extends Vue {
    greeting: string = 'Hello'

    onClick(): void {
      this.greeting = 'Click';
    }
  }
</script>

<style lang="scss" scoped>
  $color: red;
  //$color: blue;

  p {
    font-size: 2em;
    text-align: center;
    display: flex;
  }
  div {
    p {
      font-size: 5em;
    }
    p.vars {
      color: $color;
    }
  }
</style>
