/**
 * Created by mci on 2019/8/5.
 */
// 获取歌手详情页面，需要上传一个有关歌手的对象，保函歌手的mid
import {commonParams} from './config'
import axios from 'axios'

export function getsingerDetial(singerData) {
  const url = '/api/getSongList'
  const data = Object.assign({}, commonParams, {
    platform: 'yqq.json',
    needNewCode: 0,
    format: 'json'
  }, singerData)
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
