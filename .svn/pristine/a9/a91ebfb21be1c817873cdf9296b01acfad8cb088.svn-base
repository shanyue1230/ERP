// 将时间戳转化成日期

export function toDate (date) {
  date.getFullYear() // 获取完整的年份(4位,1970)
  date.getMonth() // 获取月份(0-11,0代表1月,用的时候记得加上1)
  date.getDate() // 获取日(1-31)
  date.getTime() // 获取时间(从1970.1.1开始的毫秒数)
  date.getHours() // 获取小时数(0-23)
  date.getMinutes() // 获取分钟数(0-59)
  date.getSeconds() // 获取秒数(0-59)
  let Y = date.getFullYear() + '-'
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
  let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
  let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
  let s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
  date = Y + M + D + h + m + s
  return date
}

// 将日期转化成时间戳

export function timeStamp (strtime) {
  var date = new Date(strtime.replace(/-/g, '/'))

  // 有三种方式获取
  let time1 = date.getTime()
  return time1
  // time2 = date.valueOf()
  // time3 = Date.parse(date)
}
