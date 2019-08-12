<template>
  <div class="search">
    <div class=" c">
      <i class="mint-toast-icon mintui i mintui-search" style="margin-right: 20px " v-show="flag"></i>
      <i class="mint-toast-icon mintui i mintui-back" v-show="!flag" @click="back"></i>
      <input type="text" placeholder="请输入歌手/歌曲" :style="cstyle"  @focus="toSearch" ref="input" @keyup="valueChange">
      <i class="mint-toast-icon mintui mintui-more i" style="margin-left: 20px " v-show="flag"></i>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {mapMutations, mapGetters} from 'vuex'
export default {
  data() {
    return {
    }
  },
  computed: {
    cstyle() {
      if (!this.flag) {
        return 'width: 80%; outline:none'
      }
    },
    ...mapGetters([
      'flag',
      'searchValue'
    ])
  },
  methods: {
    toSearch() {
      this.$router.push({
        path: '/searchdetail'
      })
      this.setFlag(false)
    },
    back() {
      this.$router.go(-1)
      this.setFlag(true)
      this.setSearchValue('')
    },
    ...mapMutations({
      setFlag: 'SET_FLAG',
      setSearchValue: 'SET_SEARCH_VALUE'
    }),
    valueChange() {
      this.setSearchValue(this.$refs.input.value)
    }
  },
  watch: {
    searchValue(newValue, oldValue) {
      this.$refs.input.value = newValue
    }
  }
}

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .search
    position: fixed
    left: 0
    top: 0
    height: 44px
    color: $color-theme
    border-bottom: 1px solid #eee ;
    box-shadow: 0px 20px 20px -20px #eee;
    z-index: 99
    background-color #ffffff
    width: 100%
    .c
      width: 100%
      height: 100%
      display inline-block
      text-align center
      line-height 44px
      .i
        display inline-block
        font-size 20px
        height: 100%
        vertical-align middle
      input
        width:60%;
        border-radius:42px;
        border:2px solid #cccccc;
        transition:.3s linear;
        height 30px
        padding-left 20px
        font-size 14px
        position: relative
      .mint-button
        appearance: none;
        border-radius: 42px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        color: inherit;
        display: inline-block;
        font-size: 14px;
        height: 70%;
        outline: 0;
        overflow: hidden;
        position: relative;
        text-align: center
        background-color transparent

</style>
