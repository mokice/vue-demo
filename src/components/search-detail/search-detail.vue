<template>
  <div class="search-detail">
    <div class="hot" v-show="valueFlag">
      <h1>热门搜索</h1>
      <ul>
        <li class="item" v-for="(item, index) in hostList" :key="item.n" @click="selectHot(index)">
          <span ref="hot">{{item.k}}</span>
        </li>
      </ul>
    </div>
    <searchSongList v-show="!valueFlag"></searchSongList>
  </div>
</template>
<script>
import {getSearchHot} from '../../api/search'
import {mapMutations, mapGetters} from 'vuex'
import searchSongList from '../search-songList/search-songlist.vue'
export default {
  data() {
    return {
      hostList: [],
      valueFlag: true
    }
  },
  methods: {
    _getSearchHot() {
      getSearchHot().then((res) => {
        if (res.code === 0) {
          this.hostList = res.data.hotkey.slice(0, 10)
        }
      })
    },
    selectHot(index) {
      this.setSearchValue(this.$refs.hot[index].innerHTML)
    },
    ...mapMutations({
      setSearchValue: 'SET_SEARCH_VALUE'
    })
  },
  created() {
    this._getSearchHot()
  },
  computed: {
    ...mapGetters([
      'searchValue'
    ])
  },
  watch: {
    searchValue(newValue, oldValue) {
      if (newValue !== '') {
        this.valueFlag = false
      } else {
        this.valueFlag = true
      }
    }
  },
  components: {
    searchSongList
  }
//  获取搜索列表，新建一个子组件，然后通过数据里面分析是歌手还是歌曲，就是那个zhida是否有值
//  然后做成列表，给没一个数都增加点击事件，如果是歌手的话，就传入歌手mid加路由，调取到歌手的页面
//  如果是歌曲的话，直接创建一个新的歌曲对象，然后获取vue里面的playingList对象，然后把歌曲添加到playinglist里面，
//  然后传入的index，是当前这个playinglist的最后一个，就能播放这首歌。
}
</script>
<style lang="stylus" scoped>
  .search-detail
    margin-top 45px
    .hot
      width: 100%
      padding-top 20px
      h1
        font-size 15px
        margin-left 20px
        color rgba(49,194,124,1)
      ul
        .item
          display: inline-block
          padding: 5px 10px
          margin: 10px 0 5px 20px
          border-radius: 15px
          background: $color-highlight-background
          font-size: 13px
          color: #8f8f94
          border 1px solid #999
</style>
