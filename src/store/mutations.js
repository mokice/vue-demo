/**
 * Created by mci on 2019/8/5.
 */
import * as types from './mutation-types'
const mutations = {
  [types.SET_SINGER](state, singer) {
    state.singer = singer
  },
  [types.SET_PLAYING_STATE](state, flag) {
    state.playing = flag
  },
  [types.SET_FULL_SCREEN](state, flag) {
    state.fullScreen = flag
  },
  [types.SET_PLAY_LIST](state, list) {
    state.playList = list
  },
  [types.SET_SEQUENCE_LIST](state, list) {
    state.sequenceList = list
  },
  [types.SET_PLAY_MODE](state, mode) {
    state.mode = mode
  },
  [types.SET_CURRENT_INDEX](state, index) {
    state.currentIndex = index
  },
  [types.SET_SONG_SHEET](state, songSheet) {
    state.songSheet = songSheet
  },
  [types.SET_FLAG](state, flag) {
    state.flag = flag
  },
  [types.SET_SEARCH_VALUE](state, value) {
    state.searchValue = value
  }
}

export default mutations
