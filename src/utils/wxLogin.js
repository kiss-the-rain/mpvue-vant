import flyio from './httpFlyio'
import store from '../store/index'
import wxFuns from '../utils/wxFuns'
import utils from '../utils/utils'

/**
 * @method
 * 只通过 wx.login 的 code 进行登录
 * 已登录过的用户只需用 code 换取 openid 并从缓存中获取用户信息，无需每次通过 wx.getUserInfo 去获取用户信息
 *
 * @param {Object}   options           登录配置
 * @param {string}   options.loginUrl  登录使用的 URL，服务器应该在这个 URL 上处理登录请求，建议配合服务端 SDK 使用
 * @param {string}   [options.method]  可选。请求使用的 HTTP 方法，默认为 GET
 */
async function login () {
  const loginRes = await wxFuns.login()
  const wxLogin = await flyio.post('/api/mnp/1/login', { code: loginRes.code })
  if (wxLogin.ret !== 0) {
    wx.showToast({
      title: wxLogin.msg,
      icon: 'none',
      duration: 4000
    })
    return false
  }
  store.commit('setUserInfo', wxLogin.data)
  await wxFuns.setStorageSync('userInfo', wxLogin.data)
  console.log('login', wxLogin.data)
  return wxLogin.data
}

/**
 * 获取授权状态，需要授权后才能操作的行为，可以先调用此方法进行校验，未授权则跳转到授权界面
 * @returns {boolean}
 */
const getAuthorizateStatus = () => {
  const accessToken = wxFuns.getStorageSync('userInfo').accessToken
  if (utils.isNullOrTrim(accessToken)) {
    wx.navigateTo({
      url: '../auth/main'
    })
    return false
  } else {
    return true
  }
}

async function doAuthorizate ({ encryptedData, iv, signature, rawData, sessionId, wxUserInfo }) {
  console.log(wxUserInfo)
  const result = await flyio.post('/api/mnp/1/register', { encryptedData, iv, signature, rawData, sessionId })
  console.log(result)
  if (result.ret !== 0) {
    wx.showToast({
      title: result.msg,
      icon: 'none',
      duration: 2000
    })
    return false
  }

  store.commit('setUserInfo', result.data)
  await wxFuns.setStorageSync('userInfo', result.data)
  return result.data
}

export default {
  login,
  getAuthorizateStatus,
  doAuthorizate
}
