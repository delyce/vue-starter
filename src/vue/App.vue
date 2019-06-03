<template>
  <v-app>
    <v-navigation-drawer app></v-navigation-drawer>
    <v-toolbar app>
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title><router-link to="/">Title</router-link></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat><router-link to="/"><v-icon>home</v-icon></router-link></v-btn>
        <v-btn flat><router-link to="/event"><v-icon>event</v-icon></router-link></v-btn>
        <v-btn flat><router-link to="/info"><v-icon>info</v-icon></router-link></v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer app></v-footer>
  </v-app>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';

  @Component
  export default class App extends Vue {
  }
</script>
