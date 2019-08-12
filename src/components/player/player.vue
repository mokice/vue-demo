<template>
  <div class="player" v-show="playList.length>0">
    <transition name="normal">
    <div class="normal-player" v-show="fullScreen">
      <div class="background">
        <img  alt="" width="100%" height="100%" :src="currentSong.image">
      </div>
      <div class="top">
        <div class="back" @click="back">
          <i class="mint-toast-icon mintui mintui-back icon-back"></i>
        </div>
        <h1 class="title" v-html="currentSong.name"></h1>
        <h2 class="subtitle" v-html="currentSong.singer"></h2>
      </div>
      <div class="middle"
      @touchstart.prevent="middleTouchStart"
      @touchmove.prevent="middleTouchMove"
      @touchend="middleTouchEnd">
        <div class="middle-l" ref="cd">
          <div class="cd-wrapper">
            <div class="cd" :class="cdClss">
              <img  alt="" class="image" :src="currentSong.image">
            </div>
          </div>
          <div class="playing-lyric-wrapper">
            <div class="playing-lyric">{{currentLineTxt}}</div>
          </div>
          </div>
        <div class="middle-r" ref="lyric">
          <div v-if="currentLyric">
            // 滚动的盒子太长，导致歌词置中失效，缩小高度便可以
          <scrollY :data="currentLyric.lines" :mt="90" ref="lyricList" style="height: 300px">
          <div class="lyric-wrapper">
          <div v-if="currentLyric">
            <p ref="lyricLine" class="text"
               :class="{'current': currentLineNum === index}"
               v-for="(line, index) in currentLyric.lines" :key="line.text">{{line.txt}}</p>
          </div>
        </div>
          </scrollY>
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="dot-wrapper">
          <span class="dot" :class="{'active': currentShow === 'cd' }"></span>
          <span class="dot" :class="{'active': currentShow === 'lyric' }"></span>
        </div>
        <div class="progress-wrapper">
          <span class="time time-l">{{format(currentTime)}}</span>
          <div class="progress-bar-wrapper">
            <progressBar :percent="percent" @PercentChange="progressBarChange"></progressBar>
          </div>
          <span class="time time-r">{{format(currentSong.duration)}}</span>
        </div>
        <div class="operators">
          <div class="icon i-left" @click="modeChange">
            <i :class="iconMode"></i>
          </div>
          <div class="icon i-left" @click="prev">
            <i class="icon-prev"></i>
          </div>
          <div class="icon i-center" @click="isPlaying">
            <i :class="playIcon"></i>
          </div>
          <div class="icon i-right" @click="next">
            <i class="icon-next"></i>
          </div>
          <div class="icon i-right">
            <i class="icon icon-not-favorite"></i>
          </div>
        </div>
      </div>
    </div>
    </transition>
    <transition name="mini">
    <div class="mini-player" v-show="!fullScreen" @click="open">
      <div class="icon">
        <img  alt="" width="40" height="40" :src="currentSong.image" :class="cdClss">
      </div>
      <div class="text">
        <h2 class="name" v-html="currentSong.name"></h2>
        <p class="desc" v-html="currentSong.singer"></p>
      </div>
      <div class="control" @click.stop="isPlaying">
        <i :class="miniIcon"></i>
      </div>
    </div>
    </transition>
    <audio ref="audio" :src="currentSong.url" @canplay="ready" @error="error"
    @timeupdate="upDateTime" @ended="end"></audio>
  </div>
</template>
<script>
import {mapGetters, mapMutations} from 'vuex'
import progressBar from '../subcomponents/progress-bar.vue'
import {playMode} from '../../common/js/config'
import {shuffle} from '../../common/js/random'
import {getSongLyric} from '../../api/song-lyric'
import scrollY from '../subcomponents/scrollY.vue'
import {Base64} from 'js-base64'
import Lyric from 'lyric-parser'
export default {
  data() {
    return {
      songFlag: false,
      currentTime: 0,
      currentLyric: null,
      currentLineNum: 0,
      currentShow: 'cd',
      currentLineTxt: '抱歉，此歌还没有歌词'
    }
  },
  computed: {
    cdClss() {
      return this.playing ? 'play' : 'play pause'
    },
    playIcon() {
      return this.playing ? 'icon-pause' : 'icon-play'
    },
    miniIcon() {
      return this.playing ? 'icon-pause-mini' : 'icon-play-mini'
    },
    ...mapGetters([
      'fullScreen',
      'playList',
      'currentSong',
      'playing',
      'currentIndex',
      'mode',
      'sequenceList'
    ]),
    percent() {
      return this.currentTime / this.currentSong.duration
    },
    iconMode() {
      return this.mode === playMode.sequence ? 'icon-sequence' : this.mode ===
          playMode.loop ? 'icon-loop' : 'icon-random'
    }
  },
  methods: {
    ...mapMutations({
      setFullScreen: 'SET_FULL_SCREEN',
      setPlayingState: 'SET_PLAYING_STATE',
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setPlayMode: 'SET_PLAY_MODE',
      setPlayList: 'SET_PLAY_LIST'
    }),
    back() {
      this.setFullScreen(false)
    },
    open() {
      this.setFullScreen(true)
    },
    isPlaying() {
      this.setPlayingState(!this.playing)
      this.currentLyric.togglePlay()
    },
    prev() {
      if (!this.songFlag) {
        return
      }
      let index = this.currentIndex - 1
      if (index === -1) {
        index = this.playList.length - 1
      }
      this.setCurrentIndex(index)
      if (!this.playing) {
        this.isPlaying()
      }
      this.songFlag = false
    },
    next() {
      if (!this.songFlag) {
        return
      }
      let index = this.currentIndex + 1
      if (index === this.playList.length) {
        index = 0
      }
      this.setCurrentIndex(index)
      if (!this.playing) {
        this.isPlaying()
      }
      this.songFlag = false
    },
    ready() {
      this.songFlag = true
    },
    error() {
      this.songFlag = true
    },
    upDateTime(e) {
      this.currentTime = e.target.currentTime
    },
    format(time) {
      let t = Math.floor(time)
      let minute = Math.floor(t / 60) > 0 ? '0' + Math.floor(t / 60) : '00'
      let second = Math.floor(t % 60) < 10 ? '0' + Math.floor(t % 60) : Math.floor(t % 60)
      return `${minute}:${second}`
    },
    progressBarChange(percent) {
      const currentTime = percent * this.currentSong.duration
      this.$refs.audio.currentTime = currentTime
      // 解决歌曲暂停时点击控制条效果的失效
      if (!this.playing) {
        this.isPlaying()
      }
      // 解决歌曲播放时点击控制条，歌词不匹配的问题
      if (this.currentLyric) {
        this.currentLyric.seek(currentTime * 1000) // 单位是毫秒
      }
    },
    modeChange() {
      const mode = (this.mode + 1) % 3
      this.setPlayMode(mode)
      let list = null
      if (mode === playMode.random) {
        list = shuffle(this.sequenceList)
      } else {
        list = this.sequenceList
      }
      this.resetCurrentIndex(list)
      this.setPlayList(list)
    },
    resetCurrentIndex(list) {
      let index = list.findIndex((item) => {
        return item.id === this.currentSong.id
      })
      this.setCurrentIndex(index)
    },
    end() {
      if (this.mode === playMode.loop) {
        this.loop()
      } else {
        this.next()
      }
    },
    loop() {
      this.$nextTick(() => {
        this.$refs.audio.currentTime = 0
        this.$refs.audio.play()
        if (this.currentLyric) {}
        // 回到最初
        this.currentLyric.seek(0)
      })
    },
    _getSongLyric() {
      getSongLyric(this.currentSong.mid).then((res) => {
        if (res.code === 0) {
          let lyric = Base64.decode(res.lyric)
          this.currentLyric = new Lyric(lyric, this.handleLyric)
          if (this.playing) {
            this.currentLyric.play()
          }
        }
      })
    },
    // 这里接受的是一个对象，获取每段歌词
    handleLyric({lineNum, txt}) {
      this.currentLineNum = lineNum
      this.currentLineTxt = txt
      if (lineNum > 5) {
        let lineEl = this.$refs.lyricLine[lineNum - 5]
        this.$refs.lyricList.scrollToElement(lineEl, 1000)
      } else {
        this.$refs.lyricList.scrollTo(0, 0, 1000)
      }
    },
    middleTouchStart(e) {
      this.touch.init = true
      const touch = e.touches[0]
      this.touch.startX = touch.pageX
      this.touch.startY = touch.pageY
    },
    middleTouchMove(e) {
      if (!this.touch.init) {
        return
      }
      const touch = e.touches[0]
      const deltaX = touch.pageX - this.touch.startX
      const deltaY = touch.pageY - this.touch.startY
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        return
      }
      const left = this.currentShow === 'cd' ? 0 : -window.innerWidth
      const width = Math.min(0, Math.max(-window.innerWidth, left + deltaX))
      this.touch.percent = Math.abs(width / window.innerWidth)
      this.$refs.lyric.style.transform = `translateX(${width}px)`
      this.$refs.lyric.style.transitionDuration = '0ms'
      this.$refs.cd.style.opacity = 1 - this.touch.percent
    },
    middleTouchEnd() {
      let width
      let opacity
      if (this.currentShow === 'cd') {
        if (this.touch.percent > 0.2) {
          width = -window.innerWidth
          this.currentShow = 'lyric'
          opacity = 0
        } else {
          width = 0
          opacity = 1
        }
      } else {
        if (this.touch.percent < 0.8) {
          width = 0
          this.currentShow = 'cd'
          opacity = 1
        } else {
          width = -window.innerWidth
          opacity = 0
        }
      }
      const time = 400
      this.$refs.lyric.style.transform = `translateX(${width}px)`
      this.$refs.lyric.style.transitionDuration = `${time}ms`
      this.$refs.cd.style.opacity = opacity
    }
  },
  components: {
    progressBar,
    scrollY
  },
  created() {
    this.touch = {}
  },
  watch: {
    currentSong(newSong, oldSong) {
      if (newSong.id === oldSong.id) {
        return
      }
      if (this.currentLyric) {
        this.currentLyric.stop()
      }
      this.$nextTick(() => {
        this.$refs.audio.play()
      })
      this._getSongLyric()
    },
    playing() {
      this.$nextTick(() => {
        let audio = this.$refs.audio
        this.playing ? audio.play() : audio.pause()
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .player
    .normal-player
      position: fixed
      left: 0
      right: 0
      top: 0
      bottom: 0
      z-index: 100000
      background: $color-background
      .background
        position: absolute
        left: 0
        top: 0
        width: 100%
        height: 100%
        z-index: -1
        opacity: 0.6
        filter: blur(20px)
      .top
        position: relative
        margin-bottom: 25px
        .back
          position absolute
          top: 0
          left: 6px
          z-index: 50
          .icon-back
            display: block
            padding: 9px
            font-size: $font-size-large-x
            color: $color-theme
            transform: rotate(-90deg)
        .title
          width: 70%
          margin: 0 auto
          line-height: 40px
          text-align: center
          no-wrap()
          font-size: $font-size-large
          color: #000000
        .subtitle
          line-height: 20px
          text-align: center
          font-size: $font-size-medium
          color:#000000
      .middle
        position: fixed
        width: 100%
        top: 80px
        bottom: 170px
        white-space: nowrap
        font-size: 0
        .middle-l
          display: inline-block
          vertical-align: top
          position: relative
          width: 100%
          height: 0
          padding-top: 80%
          .cd-wrapper
            position: absolute
            left: 10%
            top: 0
            width: 80%
            height: 100%
            .cd
              width: 100%
              height: 100%
              box-sizing: border-box
              border: 10px solid rgba(253, 253, 253, 0.1)
              border-radius: 50%
              &.play
                animation: rotate 20s linear infinite
              &.pause
                animation-play-state: paused
              .image
                position: absolute
                left: 0
                top: 0
                width: 100%
                height: 100%
                border-radius: 50%
          .playing-lyric-wrapper
            width: 80%
            margin: 50px auto 0 auto
            overflow: hidden
            text-align: center
            .playing-lyric
              height: 20px
              line-height: 20px
              font-size: 15px
              color: #ffffff
        .middle-r
          display: inline-block
          vertical-align: top
          width: 100%
          height: 100%
          overflow: hidden
          .lyric-wrapper
            width: 80%
            margin: 0 auto
            overflow: hidden
            text-align: center
            .text
              line-height: 32px
              color: $color-text-l
              font-size: $font-size-medium
              &.current
                color: #ffff
      .bottom
        position: absolute
        bottom: 50px
        width: 100%
        .dot-wrapper
          text-align: center
          font-size: 0
          .dot
            display: inline-block
            vertical-align: middle
            margin: 0 4px
            width: 8px
            height: 8px
            border-radius: 50%
            background: #ded7d7
            &.active
              width: 20px
              border-radius: 5px
              background: #ffffff
        .progress-wrapper
          display: flex
          align-items: center
          width: 80%
          margin: 0px auto
          padding: 10px 0
          .time
            color: #ffffff
            font-size: $font-size-small
            flex: 0 0 30px
            line-height: 30px
            width: 30px
            &.time-l
              text-align: left
            &.time-r
              text-align: right
          .progress-bar-wrapper
            flex: 1
        .operators
          display: flex
          align-items: center
          .icon
            flex: 1
            color: $color-theme
            &.disable
              color: $color-theme-d
            i
              font-size: 30px
          .i-left
            text-align: right
          .i-center
            padding: 0 20px
            text-align: center
            i
              font-size: 40px
          .i-right
            text-align: left
          .icon-favorite
            color: $color-sub-theme
      &.normal-enter-active, &.normal-leave-active
        transition: all 0.4s
        .top, .bottom
          transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
      &.normal-enter, &.normal-leave-to
        opacity: 0
        .top
          transform: translate3d(0, -100px, 0)
        .bottom
          transform: translate3d(0, 100px, 0)
    .mini-player
      display: flex
      align-items: center
      position: fixed
      left: 0
      bottom: 0
      z-index: 111111
      width: 100%
      height: 70px
      background: #ffffff
      &.mini-enter-active, &.mini-leave-active
        transition: all 0.4s
      &.mini-enter, &.mini-leave-to
        opacity: 0
      .icon
        flex: 0 0 40px
        width: 40px
        padding: 0 10px 0 20px
        img
          border-radius: 50%
          &.play
            animation: rotate 10s linear infinite
          &.pause
            animation-play-state: paused
      .text
        display: flex
        flex-direction: column
        justify-content: center
        flex: 1
        line-height: 20px
        overflow: hidden
        .name
          margin-bottom: 2px
          no-wrap()
          font-size: $font-size-medium
          color: #000
        .desc
          no-wrap()
          font-size: $font-size-small
          color: $color-text-d
      .control
        flex: 0 0 30px
        width: 30px
        padding: 0 10px
        .icon-play-mini, .icon-pause-mini, .icon-playlist
          font-size: 30px
          color: $color-text-d
        .icon-mini
          font-size: 32px
          position: absolute
          left: 0
          top: 0

  @keyframes rotate
    0%
      transform: rotate(0)
    100%
      transform: rotate(360deg)
</style>
