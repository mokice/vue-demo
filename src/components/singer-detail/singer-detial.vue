<template>
  <div class="singer-detial">
    <musicList :songs="songs" :bg-image="bgImage" :title="title" :fans="fans"></musicList>
  </div>
</template>
<script>
import {getsingerDetial} from '../../api/singer-detial'
import {createSong, getUrl} from '../../common/js/song'
import {createSinger} from '../../common/js/singer'
import {mapMutations, mapGetters} from 'vuex'
import musicList from '../subcomponents/music-list.vue'
export default {
  data() {
    return {
      singerData: {
        data: ''
      },
      songs: [],
      singerInfo: {}
    }
  },
  created() {
    this.getsingerData()
    this._getsingerDetial()
  },
  methods: {
    getsingerData() {
      var id = this.$route.params.mid
      this.singerData.data =
        '{"comm":{"ct":24,"cv":0},"singer":{"method":"get_singer_detail_info","param":{"sort":5,"singermid":"' + id +
        '","sin":0,"num":30},"module":"music.web_singer_info_svr"}}'
    },
    _getsingerDetial() {
      getsingerDetial(this.singerData).then((res) => {
        if (res.code === 0) {
          this.songs = this._normalize(res.singer.data.songlist)
          this.singerInfo = createSinger(res.singer.data.singer_info)
          this.setSinger(this.singerInfo)
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
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    })
  },
  computed: {
    title() {
      return this.singer.name
    },
    bgImage() {
      return this.singer.pic
    },
    fans() {
      return this.singer.fans
    },
    ...mapGetters([
      'singer'
    ])
  },
  components: {
    musicList
  },
  watch: {
    '$route.path': function () {
      this.getsingerData()
      this._getsingerDetial()
    }
  }

}
</script>
<style lang="stylus" scoped>
  @import "~common/stylus/variable"
  .singer-detial
    position fixed
    top 0
    left: 0
    bottom: 0
    right: 0
    background-color: $color-background
    z-index 1000
</style>
