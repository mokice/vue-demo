<template>
  <div class="music-list">
    <div class="music-clist-top">
      <div class="left" @click="goBack"><i class="mint-toast-icon mintui mintui-back"></i></div>
      <div class="right"><i class="mint-toast-icon mintui mintui-more"></i></div>
    </div>
    <div class="music-clist-title" :style="bgStyle" ref="bgImage">
      <div class="mask">
      <h1 class="name" :style="nameStyle">{{title}}</h1>
      <p class="fans" :style="fansStyle">{{judge === 'singer' ?  '粉丝：' : '播放量:'}}{{fans | numFormat}}</p>
        <div class="play-wrapper">
          <div class="play" @click="random" :style="playStyle">
            <i class="icon-play"></i>
            <span class="text">随机播放全部</span>
          </div>
        </div>
      </div>
    </div>
    <scrollY :data="songs" :mt=90 ref="list" class=wrapper>
    <songList :songs="songs" @select="selectItem"></songList>
    </scrollY>
  </div>
</template>
<script>
import songList from './song-list.vue'
import scrollY from '../subcomponents/scrollY.vue'
import {mapActions} from 'vuex'
export default {
  props: {
    bgImage: {
      type: String,
      default: ''
    },
    songs: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: ''
    },
    fans: {
      type: Number,
      default: 0
    },
    judge: {
      type: String,
      default: 'singer'
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    selectItem(item, index) {
      this.selectPlay({
        list: this.songs,
        index
      })
    },
    ...mapActions([
      'selectPlay',
      'randomPlay'
    ]),
    random() {
      this.randomPlay({
        list: this.songs
      })
    }
  },
  computed: {
    bgStyle() {
      return `background-image:url(${this.bgImage})`
    },
    nameStyle() {
      if (this.judge === 'recommend') {
        return 'margin: 0;font-size: 18px;top: 61%;width:100%;text-align:center;'
      } else {
        return ''
      }
    },
    fansStyle() {
      if (this.judge === 'recommend') {
        return 'margin: 0;font-size: 14px;top: 72%;width:100%;text-align:center;'
      } else {
        return ''
      }
    },
    playStyle() {
      if (this.judge === 'recommend') {
        return 'float:none;margin:0 auto;'
      } else {
        return ''
      }
    }
  },
  components: {
    songList,
    scrollY
  },
  mounted() {
    this.$refs.list.$el.style.top = `${this.$refs.bgImage.clientHeight}px`
  }
}
</script>
<style lang="stylus" scoped>
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .music-list
    width: 100%
    height: 100%
    .music-clist-top
      position fixed
      top: 0
      left: 0
      width: 100%
      height: 50px
      line-height 50px
      z-index 10000
      background-color transparent
      .left
        float left
        margin-left 15px
        color #fff
        font-size 20px
      .right
        float right
        margin-right 15px
        color #fff
        font-size 20px
    .music-clist-title
      width: 100%
      height: 250px
      position absolute
      box-shadow: #c7c7c7 0px 0px 7px;
      background-size cover
      z-index 800
      .mask
        background-color rgba(0,0,0,0.1)
        width: 100%
        height: 100%
        .img
          position: absolute
          width: 140px
          top: 40%
          left: 50%
          transform translate(-50%,-50%)
          border-radius 50%
          overflow hidden
          box-shadow: 0 7px 13px rgba(0,0,0,.21)
          img
            width: 100%
        .fans
          position: absolute
          top: 90%
          font-size 12px
          color: rgba(255,255,255,0.9)
          margin-left 25px
        .name
          position: absolute
          top: 78%
          font-size 20px
          font-weight: bold
          color: #ffffff
          margin-left 25px
        .play-wrapper
            position: absolute
            bottom: 15px
            z-index: 50
            width: 100%
          .play
            box-sizing: border-box
            width: 135px
            padding: 7px 0
            float right
            margin-right 10px
            text-align: center
            border: 1px solid rgba(253,253,253,0.8)
            color: #ffffff
            border-radius: 100px
            font-size: 0
            .icon-play
              display: inline-block
              vertical-align: middle
              margin-right: 6px
              font-size: $font-size-medium-x
            .text
              display: inline-block
              vertical-align: middle
              font-size: $font-size-small
</style>
