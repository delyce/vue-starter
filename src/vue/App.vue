<template>
  <v-app>
    <v-content>
<<<<<<< HEAD
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
=======
      <v-layout>
        <v-flex><v-btn><v-icon>home</v-icon> Home</v-btn></v-flex>
        <v-flex><img src="../assets/img/external.png" /></v-flex>
      </v-layout>
      <v-layout>
        <v-flex><router-link to="/page1">to Page1</router-link></v-flex>
        <v-flex><router-link to="/page2">to Page2</router-link></v-flex>
      </v-layout>
      <v-layout><router-view></router-view></v-layout>
      <v-layout>
        <div class="styling">
          <p>Nested</p>
          <p class="vars">vars</p>
        </div>
      </v-layout>
      <v-layout v-for="image in images" :key="image.id">
        <img v-lazy="image.src" height="500" />
        <v-spacer />
      </v-layout>
>>>>>>> origin/issue02
    </v-content>
  </v-app>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';

  @Component
  export default class App extends Vue {
    private images = [
      { id: 1, src: '/img/external.png?1' },
      { id: 2, src: '/img/external.png?2' },
      { id: 3, src: '/img/external.png?3' },
      { id: 4, src: '/img/external.png?4' },
      { id: 5, src: '/img/external.png?5' }
    ];
  }
</script>

<style lang="scss" scoped>
  $color: red;
  //$color: blue;

  div.styling {
    display: flex;
    background: inline(../assets/img/internal.png) no-repeat;

    p {
      font-weight: bold;
    }
    p.vars {
      color: $color;
    }
  }
</style>
