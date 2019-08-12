/**
 * Created by mci on 2019/8/5.
 */
import {playMode} from '../common/js/config'
const state = {
  singer: {},
  playing: false,
  fullScreen: false,
  playList: [],
  sequenceList: [],
  mode: playMode.sequence,
  currentIndex: -1,
  songSheet: [],
  flag: true,
  searchValue: ''
}

export default state
