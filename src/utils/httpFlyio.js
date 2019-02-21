/**
 * Created by sunny on 2018/11/28.
 * https://wendux.github.io/dist/#/doc/flyio/compare)
 * fly请求拦截器
 */
import $store from '../store/index'
import Fly from 'flyio/dist/npm/wx'
const fly = new Fly()

let host = ''
host = process.env.API_BASE_URL

// 添加请求拦截器
fly.interceptors.request.use((request) => {
  request.headers = {
    'X-Tag': 'flyio',
    'content-type': 'application/json',
    'clientSecret': 'f4dcc601099b4ba9a2b3284bdb0c2ebf',
    'accessToken': $store.state.user.accessToken,
    'cardId': $store.state.user.cardId
  }

  // 公共参数
  let authParams = {
    'timestamp': new Date().getTime()
  }

  request.body && Object.keys(request.body).forEach((val) => {
    if (request.body[val] === '') {
      delete request.body[val]
    };
  })
  request.body = {
    ...request.body,
    ...authParams
  }

  return request
})

// 添加响应拦截器
fly.interceptors.response.use(
  (response) => {
    return response.data// 请求成功之后将返回值返回
  },
  (err) => {
    // 请求出错，根据返回状态码判断出错原因
    if (err) {
      const result = {}
      result.ret = err.status || 10000
      result.msg = (err.response && err.response.data) || '操作失败'
      return Promise.resolve(result)
    };
  }
)

fly.config.baseURL = host
fly.config.timeout = 50000
export default fly
