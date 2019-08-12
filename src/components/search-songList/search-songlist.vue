<template>
  <scrollY :mt=90>
  <div class="search-songList">
    <ul v-show="flag">
      <li class="item" @click="singerSelected(zhida.singermid)">
        <div class="item-l">
          <img width="40" height="40" v-show="flag"
               :src="'https://y.gtimg.cn/music/photo_new/T001R68x68M000'+zhida.singermid+'.jpg?max_age=259200'" alt="">
        </div>
        <div class="item-r">
          <h1>{{zhida.singername}}</h1>
          <p>单曲：{{zhida.songnum}} 专辑：{{zhida.albumnum}}</p>
        </div>
      </li>
    </ul>
    <ul>
      <li class="item" v-for="item in list" :key="item.docid" @click="songSelect(item)">
        <div class="item-l">
          <img width="40" height="40" src="../search-songList/songicon.png" alt="">
        </div>
        <div class="item-r">
          <h1>{{item.songname}}</h1>
          <p>{{item.singer[0].name}}</p>
        </div>
      </li>
    </ul>
  </div>
  </scrollY>
</template>
<script>
import {mapGetters, mapMutations, mapActions} from 'vuex'
import {getSearchSongList} from '../../api/search'
import scrollY from '../../components/subcomponents/scrollY.vue'
import {filterSinger, getUrl} from '../../common/js/song'

// 因为无法接受Song这个类，直接在这里定义，
class Song {
  constructor({id, mid, singer, name, album, duration, image, url}) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }
}
export default {
  data() {
    return {
      list: [],
      zhida: {},
      flag: true
    }
  },
  methods: {
    _getSearchSongList() {
      getSearchSongList(this.searchValue).then((res) => {
        if (res.code === 0) {
          this.list = res.data.song.list
          this.zhida = res.data.zhida
          if (this.zhida.type === 0) {
            this.flag = false
          } else {
            this.flag = true
          }
        }
      })
    },
    singerSelected(mid) {
      this.$router.push({
        path: `/singer/${mid}`
      })
    },
    ...mapMutations({
      setPlayList: 'SET_PLAY_LIST'
    }),
    // 因为数据的不同，不能直接调用song里面的方法，所以在这里直接创建
    songSelect(item) {
      let list = this.playList
      getUrl(item.songmid).then((res) => {
        const url = res.req_0.data.midurlinfo[0].purl
        if (item.songmid && item.albummid) {
          list.push(new Song({
            id: item.songid,
            mid: item.songmid,
            singer: filterSinger(item.singer),
            name: item.songname,
            album: item.albumname,
            duration: item.interval,
            image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${item.albummid}.jpg?max_age=2592000`,
            url: `http://ws.stream.qqmusic.qq.com/${url}`
          }))
          this.setPlayList(list)
          let index = list.length - 1
          console.log(this.playList, index, list.length)
          this.selectPlay({
            list: this.playList,
            index
          })
        }
      })
    },
    ...mapActions([
      'selectPlay'
    ])
  },
  computed: {
    ...mapGetters([
      'searchValue',
      'playList'
    ])
  },
  watch: {
    searchValue(newValue, oldValue) {
      this._getSearchSongList()
    }
  },
  components: {
    scrollY
  }
}
</script>
<style lang="stylus" scoped>
  .search-songList
    width: 100%
    ul
      width: 100%
      .item
        width: 100%
        height: 55px
        border-bottom 1px solid #eeeeee
        .item-l
          width: 15%
          float left
          height: 100%
          position relative
          img
            border-radius 50%
            position absolute
            left 50%
            top: 50%
            transform translate(-50%,-50%)
        .item-r
          width: 85%
          float left
          height: 100%
          h1
            margin: 10px 0 5px;
            line-height: 18px;
            font-size: 16px;
            font-weight: 400;
            color: #000;
          p
            margin-right: 10px;
            font-size 12px
            color: grey
</style>
