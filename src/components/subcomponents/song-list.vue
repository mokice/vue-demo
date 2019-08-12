<template>
  <div class="song-list">
    <ul>
      <li v-for="(item, index) in songs" :key="item.mid" @click="selectItem(item, index)">
          <h1>{{item.name}}</h1>
        <p>{{item.singer}} · {{item.album}}</p>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    songs: Array
  },
  components: {
    scrollY
  },
  methods: {
    selectItem(item, index) {
      this.$emit('select', item, index)
    }
  }
}
</script>
<style lang="stylus" scoped>
  .song-list
    width: 100%
    position absolute
    z-index 30
    ul
      width: 100%
      height: 100%
      margin-top 250px
      li
        width: 100%
        height: 70px
        border-bottom:1px solid #eeeeee;
        padding-left 30px
        h1
          font-size 18px
          color: #000
          padding-top 18px
        p
          font-size 14px
          padding-top 7 px
</style>
