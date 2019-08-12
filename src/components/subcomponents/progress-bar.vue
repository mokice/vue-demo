<template>
  <div class="progress-bar" ref="progressBar" @click="clickProgress">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrapper" ref="progressBtn"
      @touchstart.prevent="progressTouchStart"
      @touchmove.prevent="progressTouchMove"
      @touchend="progressTouchEnd">
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>
<script>
const progressBtnWidth = 16
export default {
  props: {
    percent: {
      type: Number,
      default: 0
    }
  },
  created() {
    this.touch = {}
  },
  methods: {
    progressTouchStart(e) {
      this.touch.init = true
      this.touch.startX = e.touches[0].pageX
      this.touch.left = this.$refs.progress.clientWidth
    },
    progressTouchMove(e) {
      if (!this.touch.init) {
        return
      }
      const deltaX = e.touches[0].pageX - this.touch.startX
      const offsetWidth = Math.min(Math.max(0, this.touch.left + deltaX), this.$refs.progressBar.clientWidth -
        progressBtnWidth)
      this.$refs.progress.style.width = `${offsetWidth}px`
      this.$refs.progressBtn.style.transform = `translateX(${offsetWidth}px)`
    },
    progressTouchEnd() {
      this.touch.init = false
      this.updatePercent()
    },
    updatePercent() {
      const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
      const percent = this.$refs.progress.clientWidth / barWidth
      this.$emit('PercentChange', percent)
    },
    clickProgress(e) {
      const offsetWidth = e.offsetX
      this.$refs.progress.style.width = `${offsetWidth}px`
      this.$refs.progressBtn.style.transform = `translateX(${offsetWidth}px)`
      this.updatePercent()
    }
  },
  watch: {
    percent(NewPercent) {
      if (this.touch.init) {
        return
      }
      if (NewPercent >= 0) {
        const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth - 8
        const offsetWidth = NewPercent * barWidth
        this.$refs.progress.style.width = `${offsetWidth}px`
        this.$refs.progressBtn.style.transform = `translateX(${offsetWidth}px)`
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
  @import "~common/stylus/variable"

  .progress-bar
    height: 30px
    padding 0 5px
    .bar-inner
      position: relative
      top: 13px
      height: 4px
      background: #9999
      .progress
        position: absolute
        height: 100%
        background: #ffffff
      .progress-btn-wrapper
        position: absolute
        left: -8px
        top: -13px
        width: 30px
        height: 30px
        .progress-btn
          position: relative
          top: 7px
          left: 7px
          box-sizing: border-box
          width: 16px
          height: 16px
          border-radius: 50%
          background: #fff
</style>
