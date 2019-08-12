/**
 * Created by mci on 2019/8/6.
 */
// 主要用来封装歌曲，多个页面都会用到
import axios from 'axios'
export default class Song {
  constructor({id, mid, singer, name, album, duration, image, url}) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }
}
// 工厂加工函数
export function createSong(item, vkey) {
  return new Song({
    id: item.id,
    mid: item.mid,
    singer: filterSinger(item.singer),
    name: item.name,
    album: item.album.name,
    duration: item.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${item.album.mid}.jpg?max_age=2592000`,
    url: `http://ws.stream.qqmusic.qq.com/${vkey}`
  })
}

// 歌手过滤
export function filterSinger(singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach((s) => {
    ret.push(s.name)
  })
  return ret.join('/')
}

// 获取歌曲的url
export function getUrl(songmid) {
  const url = '/api/getSongList'
  const data = Object.assign({}, {
    g_tk: 1604114746,
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq.json',
    needNewCode: 0,
    data: `{"req":{"module":"CDN.SrfCdnDispatchServer","method":"GetCdnDispatch","param":{"guid":"8404790586","calltype":0,"userip":""}},"req_0":{"module":"vkey.GetVkeyServer","method":"CgiGetVkey","param":{"guid":"8404790586","songmid":["${songmid}"],"songtype":[0],"uin":"634783301","loginflag":1,"platform":"20"}},"comm":{"uin":634783301,"format":"json","ct":24,"cv":0}}`
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
