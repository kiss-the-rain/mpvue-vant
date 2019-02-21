/**
 * Copyright (c) 2018-present, Objie, Inc.
 * All rights reserved.
 *
 * 微信调用方法包装
 */

export const getStorageSync = theKey => {
  try {
    const value = wx.getStorageSync(theKey)
    return value
  } catch (e) {
    console.log(e)
    return false
  }
}

export const setStorageSync = (theKey, theValue) => {
  try {
    wx.setStorageSync(theKey, theValue)
  } catch (e) {
    console.log(e)
  }
}

export const getLocation = () => new Promise((resolve) => {
  wx.getLocation({
    success ({ latitude, longitude, speed, accuracy }) {
      resolve({ latitude, longitude, speed, accuracy })
    },
    fail () {
      resolve({
        latitude: -999,
        longitude: -999
      })
    }
  })
})

export const chooseLocation = () => new Promise((resolve, reject) => {
  wx.chooseLocation({
    success (res) {
      resolve(res)
    },
    fail (e) {
      reject(e)
    }
  })
})

export const removeStorage = theKey => new Promise((resolve, reject) => {
  wx.removeStorage({
    key: theKey,
    success (res) {
      resolve(res.data)
    },
    fail (e) {
      reject(e)
    }
  })
})

export const clearStorage = () => new Promise((resolve, reject) => {
  try {
    wx.clearStorageSync()
    resolve()
  } catch (e) {
    reject(e)
  }
})

export const login = () => new Promise((resolve, reject) => {
  wx.login({
    success (res) {
      resolve(res)
    },
    fail (e) {
      reject(e)
    }
  })
})

// 选择图片
export const chooseImage = (count = 1, sourceType = ['album'], sizeType = ['original', 'compressed']) => new Promise((resolve, reject) => {
  wx.chooseImage({
    count,
    sizeType,
    sourceType,
    success (res) {
      resolve(res)
    },
    fail (e) {
      reject(e)
    }
  })
})

export const showShareMenu = () => {
  return wx.showShareMenu
}

export const pageScrollTo = () => {
  return wx.pageScrollTo
}

export const getUserInfo = (obj) => new Promise((resolve, reject) => {
  wx.getUserInfo({
    obj,
    success (res) {
      resolve(res)
    },
    fail (e) {
      reject(e)
    }
  })
})

export const alert = (content) => {
  wx.showModal({
    title: '',
    content,
    showCancel: false
  })
}

export const navigateTo = (url) => {
  wx.navigateTo({
    url
  })
}

export const redirectTo = (redirectUrl) => {
  wx.redirectTo({
    url: redirectUrl
  })
}

export const startPullDownRefresh = () => new Promise((resolve, reject) => {
  wx.startPullDownRefresh({
    success (res) {
      resolve(res)
    },
    fail (e) {
      reject(e)
    }
  })
})

export const stopPullDownRefresh = () => new Promise((resolve, reject) => {
  wx.stopPullDownRefresh({
    success (res) {
      resolve(res)
    },
    fail (e) {
      reject(e)
    }
  })
})

// 上传图片
export const uploadFile = (obj) => new Promise((resolve, reject) => {
  wx.uploadFile({
    ...obj,
    success (res) {
      resolve(res)
    },
    fail (e) {
      reject(e)
    }
  })
})

// 获取图片信息
export const getImageInfo = (path) => new Promise((resolve, reject) => {
  wx.getImageInfo({
    src: path,
    success (imgInfo) {
      resolve(imgInfo)
    }
  })
})

// 获取本地保存的文件信息
export const getSavedFileInfo = (path) => new Promise((resolve, reject) => {
  wx.getSavedFileInfo({
    filePath: path,
    success (imgInfo) {
      resolve(imgInfo)
    }
  })
})

// 显示操作列表
export const showActionSheet = (obj) => new Promise((resolve, reject) => {
  wx.showActionSheet({
    ...obj,
    success (res) {
      resolve(res)
    },
    fail (e) {
      reject(e)
    }
  })
})

// 显示模态窗
export const showModal = (obj) => new Promise((resolve, reject) => {
  wx.showModal({
    ...obj,
    success (res) {
      resolve(res)
    },
    fail (e) {
      reject(e)
    }
  })
})

// 显示消息提示框
export const showToast = (obj) => new Promise((resolve, reject) => {
  wx.showToast({
    ...obj,
    success (res) {
      resolve(res)
    },
    fail (e) {
      reject(e)
    }
  })
})

// 隐藏消息提示框
export const hideToast = (obj) => new Promise((resolve, reject) => {
  wx.hideToast({
    ...obj,
    success (res) {
      resolve(res)
    },
    fail (e) {
      reject(e)
    }
  })
})

export default {
  getStorageSync,
  setStorageSync,
  getLocation,
  chooseLocation,
  removeStorage,
  clearStorage,
  login,
  chooseImage,
  showShareMenu,
  pageScrollTo,
  getUserInfo,
  alert,
  navigateTo,
  redirectTo,
  startPullDownRefresh,
  stopPullDownRefresh,
  uploadFile,
  getImageInfo,
  getSavedFileInfo,
  showActionSheet,
  showModal,
  showToast,
  hideToast
}
