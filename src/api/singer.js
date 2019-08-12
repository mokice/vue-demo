/**
 * Created by mci on 2019/8/4.
 */
// 获取歌手信息
// 获取全部歌单
import axios from 'axios'
export function getSingerList(limit) {
  const url = 'https://v1.itooi.cn/tencent/artist/list'
  const data = Object.assign({}, limit)
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getSingerCate(limit) {
  const url = 'https://v1.itooi.cn/tencent/artist/category'
  const data = Object.assign({}, limit)
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
