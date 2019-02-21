<template>
    <div class="container">
        <navBar title="个人中心" showBack="true"></navBar>
        <div class="header">
            <div class="user-avatar">
                <image :src="avatarUrl"></image>
            </div>
            <div class="user-info">
                <div class="nick-name">{{nickName}}</div>
                <div class="tag" @click="editUserInfo">查看编辑个人资料</div>
            </div>
            <div class="my-card">
                <div class="card" @click="openMyCardList">
                    <div class="img">
                        <image src="../../static/images/card-list.png"></image>
                    </div>
                    <div class="title">我的名片</div>
                </div>
                <div class="card create-card" @click="createMyCard">
                    <div class="img">
                        <image src="../../static/images/add card.png"></image>
                    </div>
                    <div class="title">创建名片</div>
                </div>
            </div>
            <div class="cash">
                <div class="my-balance">
                    <span class="number-color">{{cash}}</span>
                    <span> 元</span>
                    <div class="my-money" @click="withdrawBalance">提现余额</div>
                </div>
                <div class="my-coupon">
                    <span class="number-color">{{coupon}}</span>
                    <span> 张</span>
                    <div class="my-money" @click="myCoupon">我的卡券</div>
                </div>
            </div>
        </div>
        <div class="center">
            <div class="section">
                <div class="section-item" @click="myOrderList">
                    <van-icon class="section-icon" size="30px" name="orders-o" custom-style="line-height: 60px" />
                    <span class="title">我的订单</span>
                </div>
                <div class="section-item" @click="myAfterSale">
                    <van-icon class="section-icon" size="30px" name="after-sale" custom-style="line-height: 60px" />
                    <span class="title">售后服务</span>
                </div>
                <div class="section-item" @click="myTeamApplyList">
                    <van-icon class="section-icon" size="30px" name="envelop-o" custom-style="line-height: 60px" />
                    <span class="title">团队申请</span>
                </div>
            </div>
            <div class="section">
                <div class="section-item" @click="">
                    <van-icon class="section-icon" size="30px" name="envelop-o" custom-style="line-height: 60px" />
                    <span class="title">全民分销</span>
                </div>
                <div class="section-item" @click="">
                    <van-icon class="section-icon" size="30px" name="envelop-o" custom-style="line-height: 60px" />
                    <span class="title">邀请红包</span>
                </div>
                <div class="section-item" @click="">
                    <van-icon class="section-icon" size="30px" name="envelop-o" custom-style="line-height: 60px" />
                    <span class="title">尽请期待</span>
                </div>
            </div>
        </div>
        <div class='footer'></div>
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
    </div>


</template>

<script>
import wxLogin from '../../utils/wxLogin'
import navBar from '@/components/navBar'

export default {
  components: {
    navBar
  },
  data () {
    return {
      isSystemUser: false,
      avatarUrl: '',
      nickName: '',
      cash: 0,
      coupon: 0,
      showEditDialog: false,
      dialogTitle: '我的名片'
    }
  },
  onShow () {
    this.avatarUrl = this.$store.state.user.avatarUrl || 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJEia7MtRPHffJscEt2rWePuH6hiaokIGElDqUPet6EAH5KMibgIkIWWmB6F4zw0yEiayOFXXPa6qMDTw/132'
    this.nickName = this.$store.state.user.nickName || '缘来是你'
    this.cash = this.$store.state.user.cash || 0
    this.nickName = this.$store.state.user.coupon || 0
    this.isSystemUser = this.$store.state.user.isSystemUser
    console.log(`$store2 = ${JSON.stringify(this.$store.state.user)}`)
  },
  methods: {
    editUserInfo () {
      wx.showToast({
        title: '努力开发中...',
        icon: 'none',
        duration: 2000
      })
    },
    withdrawBalance () {
      wx.showToast({
        title: '努力开发中...',
        icon: 'none',
        duration: 2000
      })
    },
    myCoupon () {
      wx.showToast({
        title: '努力开发中...',
        icon: 'none',
        duration: 2000
      })
    },
    myOrderList () {
      wx.showToast({
        title: '努力开发中...',
        icon: 'none',
        duration: 2000
      })
    },
    myAfterSale () {
      wx.showToast({
        title: '努力开发中...',
        icon: 'none',
        duration: 2000
      })
    },
    // 团队加入申请
    myTeamApplyList () {
      wx.navigateTo({
        url: '../team/teamApply/main'
      })
    },
    openMyCardList () {
      wx.navigateTo({
        url: '../cardCollector/main'
      })
    },
    createMyCard () {
      if (!this.isSystemUser) {
        wxLogin.getAuthorizateStatus()
      } else {
        this.showEditDialog = true
      }
    }
  }
}
</script>

<style>
    /*  头部begin  */
    .header {
        width: 365px;
        height: 130px;
        padding: 5px 5px;
        background: #fff;
    }
    .header > .user-avatar {
        width: 80px;
        height: 80px;
        border-radius: 40px;
        float: left;
    }
    .header > .user-avatar image {
        width: 80px;
        height: 80px;
        border-radius: 40px;
    }
    .header > .user-info {
        width: 160px;
        height: 80px;
        float: left;
        margin-left: 10px;
    }
    .header > .user-info > .nick-name {
        width: 100%;
        height: 50px;
        font-size: 25px;
        line-height: 50px;
    }
    .header > .user-info > .tag {
        width: 100%;
        height: 30px;
        line-height: 30px;
    }
    .cash {
        width: 100%;
        height: 50px;
        padding: 5px auto;
        background: #fff;
    }
    .my-balance {
        width: 50%;
        height: 50px;
        text-align: center;
        float: left;
    }
    .my-coupon {
        width: 50%;
        height: 50px;
        text-align: center;
        float: right;
    }
    .my-money {
        width: 100%;
        height: 25px;
        line-height: 25px;
        text-align: center;
    }
    .number-color {
        color: #F88460;
    }

    /*  头部end  */

    .center {
        width: 100%;
    }
    .section {
        width: 100%;
        height: 75px;
        margin-top: 5px;
        background: #fff;
    }
    .section > .section-item {
        width: 33.3%;
        height: 75px;
        float: left;
        text-align: center;
    }
    .section > .section-item .section-icon {
        width: 100%;
        height: 42px;
        padding: 2px;
        display: block;
    }
    .section .title {
        font-size: 12px;
        display: inline-block;
        width: 100%;
        height: 25px;
        line-height: 25px;
        text-align: center;
    }
    .footer {
        width: 100%;
        height: 10px;
        background: #efeff4;
    }
    .my-card {
        width: 105px;
        height: 80px;
        margin-left: 260px;
        color: #fff;
    }
    .my-card > .card {
        width: 100%;
        height: 35px;
        text-align: right;
        border-radius:35rpx 0 0 35rpx;
        background: #F88460;
    }
    .my-card > .create-card {
        width: 100%;
        height: 35px;
        margin-top: 3px;
        background: #009933;
    }
    .my-card > .card > .img {
        width: 40px;
        height: 35px;
        float: left;
    }
    .my-card > .card > .img > image {
        width: 25px;
        height: 25px;
        margin: 5px 3px 5px 10px;
    }
    .my-card > .card > .title {
        display: inline-block;
        line-height: 35px;
    }

</style>
