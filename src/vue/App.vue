<template>
  <v-app>
    <v-content>
      <v-btn><v-icon>home</v-icon> Home</v-btn>
      <img src="../assets/img/external.png" />
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
      <div v-lazy-container="{ selector: 'img' }">
        <img data-src="http://placekitten.com/350/350">
        <img data-src="http://placekitten.com/350/351">
        <img data-src="http://placekitten.com/350/352">
        <img data-src="http://placekitten.com/350/353">
        <img data-src="http://placekitten.com/350/354">
        <img data-src="http://placekitten.com/350/355">
        <img data-src="http://placekitten.com/350/356">
        <img data-src="http://placekitten.com/350/357">
        <img data-src="http://placekitten.com/350/358">
        <img data-src="http://placekitten.com/350/359">
        <img data-src="http://placekitten.com/350/360">
        <img data-src="http://placekitten.com/350/361">
        <img data-src="http://placekitten.com/350/362">
        <img data-src="http://placekitten.com/350/363">
        <img data-src="http://placekitten.com/350/364">
        <img data-src="http://placekitten.com/350/365">
        <img data-src="http://placekitten.com/350/366">
      </div>
    </v-content>
  </v-app>
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
