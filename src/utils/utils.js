function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

/**
 * 时间戳按照格式输出字符串
 * @param timestamp 时间戳
 * @param format 日期格式
 * @returns string
 */
export function formatTime (timestamp, format = null) {
  const formatArr = ['Y', 'M', 'D', 'h', 'm', 's']
  let returnArr = []
  let date = new Date(timestamp * 1000) // 13位的时间戳,    如果不是13位的,  就要乘1000,就像这样 let date = new Date(timestamp*1000)
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  let hour = date.getHours()
  let minute = date.getMinutes()
  let second = date.getSeconds()
  if (format === null) {
    const t1 = [year, month, day].map(formatNumber).join('/')
    const t2 = [hour, minute, second].map(formatNumber).join(':')
    return `${t1} ${t2}`
  } else {
    returnArr.push(year, month, day, hour, minute, second)
    returnArr = returnArr.map(formatNumber)
    for (let i in returnArr) {
      format = format.replace(formatArr[i], returnArr[i])
    }
  }

  return format
}

/**
 * 是null或者是空字符串
 * @param str 字符串
 * @returns {boolean}
 */
export function isNullOrTrim (str) {
  if (str === undefined || str === null || (typeof str === 'string' && str.trim() === '')) {
    return true
  } else {
    return false
  }
};

/**
 * 既不是null也不是空字符串
 * @param str 字符串
 * @returns {boolean}
 */
export function isNoNullAndNoTrim (str) {
  if (str !== undefined && str !== null && typeof str === 'string' && str.trim() !== '') {
    return true
  } else {
    return false
  }
};

/**
 * 是数组并且不为空
 * @param arr 数组
 * @returns {boolean}
 */
export function isArrayAndHaveData (arr) {
  if (arr !== undefined && Array.isArray(arr) && arr.length > 0) {
    return true
  } else {
    return false
  }
};

/**
 * 不是数组或者为空数组
 * @param arr 数组
 * @returns {boolean}
 */
export function isNoArrayOrNoData (arr) {
  if (arr === undefined || arr === null || !Array.isArray(arr) || arr.length === undefined || arr.length === 0) {
    return true
  } else {
    return false
  }
};

/**
 * 判断参数是否是其中之一
 * @param value 参数
 * @param validList 数组
 * @returns {boolean}
 */
export function oneOf (value, validList) {
  for (let i = 0; i < validList.length; i++) {
    if (value === validList[i]) {
      return true
    }
  }
  return false
};

export function uuid (len, radix) {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
  let uuid = []
  radix = radix || chars.length

  if (len) {
    // Compact form
    for (let i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix]
  } else {
    // rfc4122, version 4 form
    let r

    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
    uuid[14] = '4'

    // Fill in random data. At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (let i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random() * 16
        uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r]
      }
    }
  }

  return uuid.join('')
}

export default {
  formatNumber,
  formatTime,
  isNullOrTrim,
  isNoNullAndNoTrim,
  isArrayAndHaveData,
  isNoArrayOrNoData,
  oneOf,
  uuid
}
