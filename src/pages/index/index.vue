<template>
  <div class="no-bg-page">
    <navBar title="首页"></navBar>
    <div class="background-business">
      <div v-if="!isSystemUser" class="create-my-card">
        <button open-type="getUserInfo" @getuserinfo="doAuthorizate">免费创建我的名片</button>
      </div>
      <div class="user-info">
        <div class="item name">{{nickName}}
          <image class="edit-icon" src="../../static/images/edit.png" @click="editUserInfo"></image>
        </div>
        <div class="item">{{position}}</div>
        <div class="item">{{phoneNumber}}</div>
        <div class="item">{{teamName}}</div>
      </div>
      <div class="user-avatar">
        <image class="icon_head" :src="avatarUrl"></image>
        <image class="vip_log" src="../../static/images/icon_vip@3x.png"></image>
      </div>
    </div>
    <div class="impression-tag">
      <span v-for="(impression, index) in impressions" :key="index">
        <van-button size="normal" class="impression-item" @click="impressionAdd(impression.name)" >{{ impression.name }} {{ impression.count }}</van-button>
      </span>
    </div>

    <van-dialog
        use-slot
        async-close
        :show="showEditDialog"
        :title="dialogTitle"
        show-cancel-button
        @close="onClose"
    >
      <van-cell-group>
        <van-field
            name="nickName"
            :value="nickName"
            @change="fieldInput($event,'nickName')"
            label="昵称"
            placeholder="请输入您的称呼"
        />
        <van-field
            name="phoneNumber"
            @change="fieldInput($event,'phoneNumber')"
            :value="phoneNumber"
            label="电话"
            placeholder="请输入电话号码"
        />
        <van-field
            name="wxId"
            :value="wxId"
            @change="fieldInput($event,'wxId')"
            label="微信号"
            :border="false"
            placeholder="请输入微信名称"
        />
        <van-field
            name="aboutUs"
            :value="aboutUs"
            @change="fieldInput($event,'aboutUs')"
            label="关于我们"
            :border="false"
            placeholder="请用 ',' 分割多行"
        />

      </van-cell-group>
    </van-dialog>

    <div class="blank-line"></div>
    <div class="title-block">
      <div class="title">关于我们</div>
      <ul>
        <li>生活有度，人生添寿</li>
        <li>时间是一切财富中最宝贵的财富</li>
        <li>我需要三件东西：爱情友谊和图书</li>
      </ul>
    </div>

    <div class="blank-line"></div>
    <div class="title-block">
      <div class="title">推荐商品</div>
      <div class="product">
        <van-card
            num="2"
            tag="标签"
            price="2.00"
            desc="描述信息"
            title="商品标题"
            thumb="//img.yzcdn.cn/upload_files/2017/07/02/af5b9f44deaeb68000d7e4a711160c53.jpg"
        >
        </van-card>
        <van-card
            num="2"
            tag="标签"
            price="2.00"
            desc="描述信息"
            title="商品标题"
            thumb="//img.yzcdn.cn/upload_files/2017/07/02/af5b9f44deaeb68000d7e4a711160c53.jpg"
        >
        </van-card>
      </div>
    </div>
    <div class="blank-line"></div>
    <div class="title-block">
      <div class="title">照片展示</div>
      <block v-for="(item,index) in uploadImageInfo" :key="index">
        <div class="upload-image">
          <image :src="item.path" mode="aspectFit"/>
        </div>
      </block>
    </div>
    <imageUpload @afterUpload="showUploadImage"></imageUpload>
    <div v-if="!isSystemUser" class="button-backgroup"></div>
  </div>
</template>

<script>
// @是 mpvue 的一个别名，指向src目录
import wxLogin from '../../utils/wxLogin'
import imageUpload from '@/components/upload'
import navBar from '@/components/navBar'
import httpFlyio from '../../utils/httpFlyio'
import store from '../../store/index'

export default {
  components: {
    imageUpload,
    navBar
  },
  data () {
    return {
      uploadImageInfo: [],
      showEditDialog: false,
      wxId: '',
      aboutUs: '',
      dialogTitle: '修改个人信息',
      showDialogBtn: false,
      tempFormInput: {}
    }
  },
  onLoad () {
    const storageUserInfo = this.wxFuns.getStorageSync('userInfo')
    store.commit('setUserInfo', storageUserInfo)
  },
  mounted: async function () {
    // 首次进入小程序
    console.log('first login')
    try {
      const result = await wxLogin.login()
      if (result) {
        console.log(`login ok`, result)
      }
    } catch (e) {
      console.log(`login error `, e)
    }
  },
  methods: {
    async doAuthorizate (e) {
      console.log(e)
      const { encryptedData, iv, signature, rawData } = e.mp.detail
      const userInfo = this.wxFuns.getStorageSync('userInfo')
      console.log('register', userInfo)
      if (e.mp.detail.userInfo) {
        await wxLogin.doAuthorizate({ encryptedData, iv, signature, rawData, sessionId: userInfo.sessionId, wxUserInfo: e.mp.detail.userInfo })
      } else {
        console.log('您拒绝了授权')
      }
    },
    editUserInfo () {
      this.showEditDialog = true
    },
    async onClose (event) {
      if (event.mp.detail === 'confirm') {
        wx.showToast({
          title: '提交中...',
          icon: 'loading',
          mask: true
        })
        this.showEditDialog = false
        const result = await httpFlyio.post('/api/mnp/1/card_save', this.tempFormInput)

        if (result.ret !== 0) {
          wx.showToast({
            title: result.msg,
            icon: 'none',
            mask: true
          })
        }
        this.tempFormInput = []
      }
      this.showEditDialog = false
    },
    showUploadImage (uploadImageInfo) {
      this.uploadImageInfo = this.uploadImageInfo.concat(uploadImageInfo)
    },
    // 输入框输入的时候更改data中对应的数据
    fieldInput (event, target) {
      this.tempFormInput[target] = event.mp.detail
    },
    async impressionAdd (option) {
      const cardId = this.$store.state.user.card.cardId
      const wxOpenId = this.$store.state.user.wxOpenId
      const result = await httpFlyio.post('/api/mnp/1/like_impression', {
        cardId,
        wxOpenId,
        editorId: 'test-1111111',
        name: option
      })
      if (result.ret !== 0) {
        wx.showToast({
          title: result.msg,
          icon: 'none',
          mask: true
        })
      } else {
        this.$store.state.user.impressions.forEach((value, index, impression) => {
          if (value.name === option) {
            impression[index].count++
          }
        })
      }
    }
  },
  computed: {
    isSystemUser () {
      return this.$store.state.user.isSystemUser
    },
    nickName () {
      return this.$store.state.user.card.name ? this.$store.state.user.card.name : '客服'
    },
    phoneNumber () {
      return this.$store.state.user.card.mobile ? this.$store.state.user.card.mobile : '13812345678'
    },
    position () {
      // card 表中的 title 标记为用户名品职位
      return this.$store.state.user.card.title ? this.$store.state.user.card.title : '销售经理'
    },
    teamName () {
      // card 表中的 title 标记为用户名品职位
      return this.$store.state.user.card.teamName ? this.$store.state.user.card.teamName : '中国平安'
    },
    impressions () {
      return this.$store.state.user.impressions
    }
  }
}
</script>

<style lang="less">
  .background-business {
    width: 355px;
    height: 150px;
    background-color: #fafafa;
    margin: 5px auto;
    border-radius: 8px;
    border: 1px solid #2b85e4;
  }
  .user-info {
    width: 180px;
    float: left;
    padding: 10px 10px;
  }
  .user-info > .item {
    color: #555;
    height: 20px;
    line-height: 20px;
    margin-bottom: 10px;
  }
  .user-info > .name {
    height: 30px;
    font-size: 20px;
    color: #2b85e4;
    line-height: 30px;
  }
  .edit-icon {
    width: 25px;
    height: 25px;
  }
  .user-avatar {
    width: 150px;
    height: 100%;
    float: left;
  }

  .icon_head {
    width: 130px;
    height: 130px;
    border-radius: 65px;
    margin: 10px;
  }

  .vip_log {
    width: 30px;
    height: 30px;
    position: relative;
    left: 100px;
    top: -50px;
  }

  .customer-name {
    width: 100%;
    height: 50px;
    font-size: 25px;
    line-height: 50px;
    text-align: center;
    margin-top: -100px;
  }

  .impression-tag {
    width: 100%;
    margin: 0 auto;
    text-align: center;
  }

  .impression-item {
    display: inline-block;
    margin: 5px
  }

  .impression-item .van-button {
    height: 30px;
    line-height: 30px;
    padding: 0 4px;
    color: #2b85e4;
    border: 1px solid #2b85e4
  }

  .setting {
    width: 355px;
    height: 60px;
    padding: 0 10px;
  }

  .setting .setting-item {
    width: 140px;
    height: 100%;
    margin: 0 5px;
    float: left;
  }

  .setting > .right-setting {
    margin-left: 55px;
  }

  .setting .setting-item image {
    width: 50px;
    height: 50px;
    padding: 5px 0;
    float: left;
  }

  .setting .setting-item span {
    display: inline-block;
    height: 60px;
    line-height: 60px;
    padding-left: 5px;
  }

  .product {
    width: 100%;
    height: 100%;
    margin: 5px auto;
  }

  .title-block {
    width: 355px;
    margin: 5px 10px;
  }
  .title-block > ul {
    padding: 5px;
  }
  .title-block .title {
    width: 100%;
    height: 25px;
    line-height: 25px;
  }

  ul > li {
    margin: 5px 0;
  }

  .upload-image {
    width: 355px;
    height: 250px;
  }

  .upload-image image {
    width: 355px;
    height: 250px;
    margin: 0 auto;
  }

  .tag {
    width: 70px;
    heihgt: 40px;
    position: fixed;
    right: 10px;
    top: 30px;
    background-color: #2b85e4;
    z-index: 99;
    border-radius: 20px 0 0 20px;
  }

  .tag > .blank-div {
    width: 70px;
    height: 40px;
    float: right;
    line-height: 30px;
  }

  .tag > .logo {
    display: inline-block;
    width: 37px;
    height: 37px;
    line-height: 40px;
    position: absolute;
    z-index: 100;
    border: 2px solid #2b85e4;
    border-radius: 19px;
  }
  .upload{
    margin: 5px 10px;
  }

  .create-my-card {
    bottom: 0px;
    position: fixed;
    width: 355px;
    z-index: 100;
    border-radius:40px;
    background-color: #2b85e4;
    height: 46px;
    border: 1px solid red;
    margin: 0 5px;

    button {
      background-color: transparent;
      color: #fff;
      border-radius:40px;
    }
  }

  .button-backgroup{
    height: 46px;
  }

</style>
