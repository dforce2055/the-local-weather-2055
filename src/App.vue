<template>
  <section class="flex flex-col min-h-screen">
    <NavBar v-if="false" />
    <SiteNavigation />
    <router-view />
    <FooterComponent />
  </section>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import FooterComponent from './components/FooterComponent.vue';
import NavBar from './components/NavBar.vue';
import SiteNavigation from './components/SiteNavigation.vue';

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'App',
  components: {
    FooterComponent,
    NavBar,
    SiteNavigation
  },
});
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
