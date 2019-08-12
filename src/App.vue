<template>
  <div id="app">
    <Mheader></Mheader>
    <Tab></Tab>
    <keep-alive>
    <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
import Mheader from './components/m-head/m-head.vue'
import Tab from './components/tab/tab.vue'
import player from './components/player/player.vue'
export default {
  components: {
    Mheader,
    Tab,
    player
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  @import "common/stylus/variable.styl"
  #app
    background-color $color-background
  .v-enter
    transform: translateX(100%);
    opacity: 0;
  .v-leave-to
    transform: translateX(-100%);
    opacity: 0;
  .v-enter-active,
  .v-leave-active
    transition: all 0.5s ease;
</style>
