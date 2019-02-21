<template>

    <div v-if="canIUse">
        <div class='header'>
            <image src='../../static/images/card-logo.png'></image>
        </div>

        <div class='content'>
            <div>申请获取以下权限</div>
            <text>获得你的公开信息(昵称，头像等)</text>
        </div>

        <van-button type="primary" style="width: 100%;display:block;margin:0 auto" v-if="canIUse" open-type="getUserInfo" @getuserinfo="bindGetUserInfo">授权登录</van-button>

    </div>

    <div v-else>请升级微信版本</div>

</template>

<script>
    import wxLogin from '../../utils/wxLogin'
    export default {
      data () {
        return {
          canIUse: wx.canIUse('button.open-type.getUserInfo')
        }
      },
      onLoad () {},
      methods: {
        setData (data) {
          Object.keys(data).forEach(key => {
            this[key] = data[key]
          })
        },
        async bindGetUserInfo (e) {
          console.log(e)
          const { encryptedData, iv, signature, rawData } = e.mp.detail
          const userInfo = this.wxFuns.getStorageSync('userInfo')
          console.log('register', userInfo)
          if (e.mp.detail.userInfo) {
            const doAuth = await wxLogin.doAuthorizate({ encryptedData, iv, signature, rawData, sessionId: userInfo.sessionId, wxUserInfo: e.mp.detail.userInfo })
            console.log(doAuth)
            if (doAuth) {
              // 返回到上一个页面
              wx.navigateBack()
              wx.switchTab({
                url: '../index/main'
              })
            }
          } else {
            // 用户按了拒绝按钮
            wx.showModal({
              title: '警告',
              content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
              showCancel: false,
              confirmText: '返回授权',
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击了“返回授权”')
                }
              }
            })
          }
        }
      }

    }
</script>

<style>
    /* pages/user/user.wxss */
    .header {
        margin: 45px 0 45px 25px;
        border-bottom: 1px solid #ccc;
        text-align: center;
        width: 330px;
        height: 150px;
        line-height: 250px;
    }

    .header image {
        width: 100px;
        height: 100px;
    }

    .content {
        margin-left: 25px;
        margin-bottom: 45px;
    }

    .content text {
        display: block;
        color: #9d9d9d;
        margin-top: 20px;
    }
    .bottom {
        border-radius: 40px;
        margin: 35px 25px;
        font-size: 18px;
    }

</style>
