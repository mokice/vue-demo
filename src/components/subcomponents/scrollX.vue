<template>
  <div ref="wrapper" class="wrapper" :style="contentWidth" >
    <slot></slot>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
export default {
  data() {
    return {
      contentWidth: {
        width: '',
        zIndex: 88,
        position: 'relative',
        backgroundColor: '#FDFDFD'
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
    }
  },
  mounted() {
    setTimeout(() => {
      this._initScroll()
    }, 20)
    this.getWidth()
  },
  methods: {
    _initScroll() {
      if (!this.$refs.wrapper) {
        return
      }
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click,
        scrollX: true,
        // 忽略竖直方向的滚动
        scrollY: false
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
    getWidth() {
      this.contentWidth.width = window.innerWidth + 'px'
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
</style>
