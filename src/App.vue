<template>
  <v-app>
    <router-view></router-view>
    <SnackBar ref="SnackBar"></SnackBar>
  </v-app>
</template>

<script>
  import SnackBar from "./components/SnackBar";
  export default {
    components: {SnackBar},
    mounted() {
      this.$root.SnackBar = this.$refs.SnackBar;
    }
  }

</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-weight: lighter;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
