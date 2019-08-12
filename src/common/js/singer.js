/**
 * Created by mci on 2019/8/6.
 */
export default class Singer {
  constructor({id, mid, name, pic, fans}) {
    this.id = id
    this.mid = mid
    this.pic = pic
    this.name = name
    this.fans = fans
  }
}
export function createSinger(item) {
  return new Singer({
    id: item.id,
    mid: item.mid,
    pic: `https://y.gtimg.cn/music/photo_new/T001R300x300M000${item.mid}.jpg?max_age=2592000`,
    name: item.name,
    fans: item.fans
  })
}
