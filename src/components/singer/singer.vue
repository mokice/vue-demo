<template>
  <div>
    <scrollX :data="singerCate.index" >
    <div class="singerList-category">
      <div class="singerList-category-index">
        <ul >
          <li  v-for="(item, i) in singerCate.index" :class="isIndexActive == i ? 'addclass' : '' " :key="item.id"
               @click="indexClick(item.id, i, 'index')">
            <div class="item">{{item.name}}</div>
          </li>
        </ul>
      </div>
      <div class="singerList-category-areaId">
        <ul >
          <li  v-for="(item, i) in singerCate.area" :class="isAreaActive == i ? 'addclass' : '' " :key="item.id"
               @click="indexClick(item.id, i, 'areaId')">
            <div class="item">{{item.name}}</div>
          </li>
        </ul>
      </div>
      <div class="singerList-category-sexId">
        <ul >
          <li  v-for="(item, i) in singerCate.sex" :class="isSexActive == i ? 'addclass' : '' " :key="item.id"
               @click="indexClick(item.id, i, 'sexId')">
            <div class="item">{{item.name}}</div>
          </li>
        </ul>
      </div>
      <div class="singerList-category-genre">
        <ul >
          <li  v-for="(item, i) in singerCate.genre" :class="isGenreActive == i ? 'addclass' : '' " :key="item.id"
               @click="indexClick(item.id, i, 'genre')">
            <div class="item">{{item.name}}</div>
          </li>
        </ul>
      </div>
    </div>
    </scrollX>
    <scrollY :data="singerList" :mt=90>
    <div class="singerList-container">
      <ul>
        <router-link :to="'/singer/'+item.singer_mid" class="singerList-container-item" v-for="item in singerList"
                     :key="item.singer_mid">
          <div class="singerList-container-item-left">
            <img width="60" height="60" v-lazy="item.singer_pic">
          </div>
          <div class="singerList-container-item-right">
            <p>{{item.singer_name}}</p>
          </div>
        </router-link>
      </ul>
    </div>
    </scrollY>
  </div>
</template>
<script>
import scrollX from '../subcomponents/scrollX.vue'
import scrollY from '../subcomponents/scrollY.vue'
import {getSingerList, getSingerCate} from '../../api/singer'

export default {
  data() {
    return {
      singerList: [],
      singerCate: [],
      cate: {
        index: -100,
        area: -100,
        genre: -100,
        sex: -100
      },
      isIndexActive: 0,
      isSexActive: 0,
      isGenreActive: 0,
      isAreaActive: 0,
      singer: {}
    }
  },
  created() {
    this._getSingerList(this.cate)
    this._getSingerCate()
  },
  methods: {
    _getSingerList(data) {
      getSingerList(data).then((res) => {
        if (res.code === 200) {
          this.singerList = res.data
        }
      })
    },
    _getSingerCate() {
      getSingerCate().then((res) => {
        if (res.code === 200) {
          this.singerCate = res.data
        }
      })
    },
    indexClick(id, i, cate) {
      if (cate === 'index') {
        this.isIndexActive = i
        this.cate['index'] = id
      }
      if (cate === 'sexId') {
        this.isSexActive = i
        this.cate['sexId'] = id
      }
      if (cate === 'genre') {
        this.isGenreActive = i
        this.cate['genre'] = id
      }
      if (cate === 'areaId') {
        this.isAreaActive = i
        this.cate['areaId'] = id
      }
      this._getSingerList(this.cate)
    }
  },
  components: {
    'scrollX': scrollX,
    'scrollY': scrollY
  }
}
</script>
<style lang="stylus" scoped>
  @import "~common/stylus/variable"
  .addclass
    background-color: $color-active
    color #ffffff
  .singerList-category
    margin-left 8px
    margin-top 90px
    width: 220%
    height: 150px
    box-shadow: #c7c7c7 0px 0px 7px;
    overflow hidden
    ul
      margin 5px 0
      margin-left 5px
      li
        display:inline-block
        font-size 15px
        cursor:pointer
        padding 8px
        border-radius 5px
  .singerList-container
    width: 100%
    ul
      .singerList-container-item
        height: 80px
        display flex
        justify-content space-betweens
        border-bottom 1px solid #eeeeee
        .singerList-container-item-left
          width: 25%
          position relative
          img
            position absolute
            left: 50%
            top: 50%
            margin-left -30px
            margin-top: -30px
            border-radius 50%
        .singerList-container-item-right
          width 75%
          p
            line-height: 80px
            color: $color-text-ll
</style>
