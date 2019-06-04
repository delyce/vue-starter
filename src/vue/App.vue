<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" fixed app>
      <v-list>
        <v-list-tile to='/'>
            <v-list-tile-action><v-icon>home</v-icon></v-list-tile-action>
            <v-list-tile-content><v-list-tile-title>Home</v-list-tile-title></v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app>
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Vue Starter</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn to='/page1' icon><v-icon>event</v-icon></v-btn>
        <v-btn to='/page2' icon><v-icon>info</v-icon></v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer fixed app>
      <v-layout justify-center>(C) 2019</v-layout>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';

  @Component
  export default class App extends Vue {
    private drawer: boolean = false;
  }
</script>
