/**
 * Created by mci on 2019/8/3.
 */
// url拼接的小方法
import orginJsonp from 'jsonp'

export default function jsonp(url, data, option) {
  url += (url.indexOf('?') < 0 ? '?' : '&') + parm(data)
  return new Promise((resolve, reject) => {
    orginJsonp(url, option, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

// 构造一个拼接函数，因为原生这个jsop是数据和地址连在一起的。
function parm(data) {
  let url = ''
  for (var key in data) {
    let value = data[key] !== undefined ? data[key] : ''
    url += `&${key}=${encodeURIComponent(value)}`
  }
  // 去掉第一个&
  return url ? url.substring(1) : ''
}
