<template>
  <div id="app">
    <transition
      name="slide"
      enter-active-class="slideInRight"
      leave-active-class="slideOutLeft"
    >
    <router-view/>
    </transition>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="less">
@import "./common/css/animate.less";
html,
body {
  height: 100%;
  margin: 0px;
  padding: 0px;
  overflow: hidden;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #2c3e50;
  width: 100%;
  height: 100%;
}
</style>
