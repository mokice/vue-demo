<template>
  <div ref="wrapper" class="wrapper" :style="contentStyle">
    <slot></slot>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
export default {
  data() {
    return {
      contentStyle: {
        height: '',
        marginTop: ''
      }
    }
  },
  props: {
    probeType: {
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: true
    },
    data: {
      type: Array,
      default: null
    },
    mt: {
      type: Number,
      default: 0
    }
  },
  mounted() {
    setTimeout(() => {
      this._initScroll()
    }, 20)
    this.getHeight()
  },
  methods: {
    _initScroll() {
      if (!this.$refs.wrapper) {
        return
      }
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click
      })
      console.log(this.scroll)
    },
    enable() {
      this.scroll && this.scroll.enable()
    },
    disable() {
      this.scroll && this.scroll.disable()
    },
    refresh() {
      this.scroll && this.scroll.refresh()
    },
    getHeight() {
      // 鬼知道他要减多少，直接传个数组过来，再进行减就好了
      this.contentStyle.height = window.innerHeight - 90 + this.mt + 'px'
      this.contentStyle.marginTop = 90 - this.mt + 'px'
    },
    scrollTo() {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    scrollToElement() {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        this.refresh()
      }, 20)
    }
  }
}

</script>
<style lang="stylus" scoped>
  .wrapper
    margin-top 90px
</style>
