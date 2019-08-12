/**
 * Created by mci on 2019/8/3.
 */
// import jsonp from '../common/js/jsonp'
import {commonParams} from './config'
import axios from 'axios'

// 如果是jsonp的接口，我们就用这种方式
// export default function getRecommend() {
//   const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
//   const data = Object.assign({}, commonParams, {
//     platform: 'h5',
//     uin: 0,
//     needNewCode: 1
//   })
//   return jsonp(url, data, options)
// }

// 但是QQ音乐的接口已经改变，变成了json，所以我们就用反向代理来跨域
// ajax请求,不是jsonp请求了
// ajax请求,不是jsonp请求了
// 获取轮播图
export function getRecommend() {
  const url = '/api/getRecommend'
  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1,
    format: 'json'
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 获取全部歌单
export function getSongList() {
  const url = 'https://v1.itooi.cn/tencent/songList/hot'
  const data = Object.assign({}, {
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
