<template>
  <div class="recommend-detail">
    <musicList :title="title" :bgImage="imgurl" :fans="listennum" :judge="judge" :songs="songs"></musicList>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
import musicList from '../subcomponents/music-list.vue'
import {getRecommendDetail} from '../../api/recommend-detail'
import {getUrl, createSong} from '../../common/js/song'
export default {
  data() {
    return {
      title: '',
      imgurl: '',
      listennum: 0,
      judge: 'recommend',
      id: this.$route.params.id,
      songs: []
    }
  },
  computed: {
    ...mapGetters([
      'songSheet'
    ])
  },
  components: {
    musicList
  },
  methods: {
    _getRecommendDetail() {
      getRecommendDetail(this.id).then((res) => {
        if (res.code === 0) {
          this.songs = this._normalize(res.cdlist[0].songlist)
          console.log(res.songlist)
        }
      })
    },
    _normalize(list) {
      let ret = []
      list.forEach((item) => {
        getUrl(item.mid).then((res) => {
          const url = res.req_0.data.midurlinfo[0].purl
          if (item.mid && item.album.mid) {
            ret.push(createSong(item, url))
          }
        })
      })
      return ret
    }
  },
  created() {
    this.title = this.songSheet.dissname
    this.imgurl = this.songSheet.imgurl
    this.listennum = this.songSheet.listennum
    this._getRecommendDetail()
  }
}
</script>
<style lang="stylus" scoped>
  @import "~common/stylus/variable"
  .recommend-detail
    position fixed
    top 0
    left: 0
    bottom: 0
    right: 0
    background-color: $color-background
    z-index 1000
</style>
