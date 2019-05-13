<template>
  <div>
    <p @click="onClick">{{ greeting }} World!</p>
    <router-link to="/page1">to Page1</router-link>
    <router-link to="/page2">to Page2</router-link>
    <router-view></router-view>
    <div>
      <p>nested</p>
    </div>
    <div>
      <p class="vars">vars</p>
    </div>
  </div>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';

  @Component
  export default class App extends Vue {
    private greeting: string = 'Hello';

    private onClick() {
      this.greeting = 'Click';
    }
  }
</script>

<style lang="scss" scoped>
  $color: red;
  //$color: blue;

  div {
    background: inline(../assets/img/internal.png) no-repeat;
  }

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
