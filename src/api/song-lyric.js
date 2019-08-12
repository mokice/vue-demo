/**
 * Created by mci on 2019/8/8.
 */
import axios from 'axios'

export function getSongLyric(songmid) {
  const url = '/api/getSongLyric'
  const data = Object.assign({}, {
    songmid: songmid,
    g_tk: 1626122924,
    loginUin: 634783301,
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq.json',
    needNewCode: 0
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
