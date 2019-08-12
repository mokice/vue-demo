<template>
  <div>
    <div class="loading-container" v-show="!lunbotuList.length">
      <loading></loading>
    </div>
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="item in lunbotuList" :key="item.id">
        <a :href="item.linkUrl">
        <img @load="callback" :src="item.picUrl" alt="" :class="{'full': isfull}">
        </a>
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>
<script>
import loading from '../subcomponents/loading.vue'
export default{
  props: ['lunbotuList', 'isfull', 'callback'],
  methods: {
  },
  components: {
    'loading': loading
  }
}
</script>
<style lang="stylus" scoped>
  .mint-swipe
    height: 200px;
    .mint-swipe-item
      text-align: center;
      float left
      img
        /*width: 100%;*/
        height: 100%;
      .full
        width: 100%;
  .loading-container
    position absolute
    width 100%
    top:27%
    transform translateY(-50%)
    z-index 50
</style>
