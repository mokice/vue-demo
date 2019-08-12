<template>
  <div>
    <scroll :data="songList" ref="scroll">
      <!--只有第一个子元素会动，那么我们就用个div把全部包起来就可以-->
      <div>
    <swiper :lunbotuList="lunbotuList" :isfull="true" :callback="callback"></swiper>
    <div class="recommend-list">
      <h1 class="list-title">热门歌单推荐</h1>
      <ul class="song-list">
        <li   class="song-list-item" @click="selectItem(item)" v-for="item
         in songList" :key="item.dissid" >
          <div class="song-list-item-left">
            <img width="90" height="90" v-lazy="item.imgurl">
          </div>
          <div class="song-list-item-right">
            <p class="desc" v-html="item.dissname"></p>
            <h2 class="name" v-html="item.creator.name"></h2>
            <h1 class="listennum">播放量：{{item.listennum | numFormat}}</h1>
          </div>
        </li>
      </ul>
    </div>
    </div>
      <div class="loading-container" v-show="!songList.length">
        <loading></loading>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>
<script>
import {getRecommend, getSongList} from '../../api/recommend'
import {ERR_OK} from '../../api/config'
import swiper from '../subcomponents/swipe.vue'
import scroll from '../subcomponents/scrollY.vue'
import loading from '../subcomponents/loading.vue'
import {mapMutations} from 'vuex'
export default {
  data() {
    return {
      lunbotuList: [],
      songList: []
    }
  },
  created() {
    this._getRecommend()
    this._getSongList()
  },
  methods: {
    _getRecommend() {
      getRecommend().then((res) => {
        if (res.code === ERR_OK) {
          this.lunbotuList = res.data.slider
        }
      })
    },
    _getSongList() {
      getSongList().then((res) => {
        if (res.code === 200) {
          this.songList = res.data.list
        }
      })
    },
    callback() {
      this.$refs.scroll.refresh()
    },
    selectItem(item) {
      this.setSongSheet(item)
      this.$router.push({
        path: `/recommend/${item.dissid}`
      })
    },
    ...mapMutations({
      setSongSheet: 'SET_SONG_SHEET'
    })
  },
  components: {
    'swiper': swiper,
    'scroll': scroll,
    'loading': loading
  }
}
</script>
<style lang="stylus" scoped>
  @import "~common/stylus/variable"
  .recommend-list
    text-align: center
    line-height: 50px
    color: $color-theme
    .list-title
      height: 50px
      border-bottom: 1px solid #eee ;
      box-shadow: 0px 20px 20px -20px #eee;
    .song-list
      margin-top 10px
      .song-list-item
        width: 100%
        height: 120px
        display: flex
        justify-content space-between
        margin-top: 10px
        box-shadow: #c7c7c7 0px 0px 7px;
        .song-list-item-left
          width: 30%
          position: relative
          img
            position: absolute
            left: 50%
            top: 50%
            margin-left: -45px
            margin-top: -45px
        .song-list-item-right
          width: 70%
          .name
            text-align left
            height: 30px
            color $color-text-l
            margin-left 10px
            font-size: 13px
          .desc
            text-align left
            height: 30px
            margin-top 5px
            margin-left 10px
            font-size: $font-size-medium
          .listennum
            text-align left
            height: 30px
            color $color-text-l
            margin-left 10px
            font-size: 13px
  .loading-container
    position absolute
    width 100%
    top:60%
    transform translateY(-50%)
    z-index 50
</style>
