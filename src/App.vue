<template>
  <top-menu />
  <div class="app">
    <navigation-menu />
    <router-view />
  </div>
</template>

<script>
import NavigationMenu from "@/components/NavigationMenu";
import TopMenu from "@/components/TopMenu";

export default {
  components: {
    NavigationMenu,
    TopMenu,
  },
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.app {
  display: flex;
}
</style>
