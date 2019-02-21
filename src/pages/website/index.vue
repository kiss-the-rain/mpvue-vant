<template>
  <div class="page" @click="getTeamInfo">
    <navBar title="官网"></navBar>
    <div class="header">
      <imageUpload @afterUpload="showUploadImage" :disable="!isOwner">
        <div slot="icon">
          <div v-if="websiteInfo.logoUrl">
            <image :src="websiteInfo.logoUrl"></image>
          </div>
          <div v-else>
            <van-icon name="photo-o" class="default-empty-logo"></van-icon>
          </div>
        </div>
      </imageUpload>
    </div>

    <van-tabs sticky animated class="content" :active="active" :scroll-top="scrollTop" @change="changeTab">
      <van-tab title="主页">
        <!--关于我们-->
        <websiteIndex ref="section0" v-bind:info="websiteInfo.description" v-bind:pics="websiteInfo.showImagesArray" @saveAboutUs="saveAboutUs" @saveShowImages="saveShowImages"></websiteIndex>
      </van-tab>
      <van-tab title="新闻">
        <news ref="section1"></news>
      </van-tab>
      <van-tab class="company-product-list" title="产品">
        <productList ref="section2"></productList>
      </van-tab>
      <van-tab title="案例">
          <cases ref="section3"></cases>
      </van-tab>
    </van-tabs>

  </div>
</template>


<script>
import flyio from '../../utils/httpFlyio'

import websiteIndex from './components/index.vue'
import news from './components/news.vue'
import productList from './components/productList.vue'
import cases from './components/cases.vue'
import imageUpload from '@/components/upload.vue'
import navBar from '@/components/navBar'
export default {
  components: {
    websiteIndex,
    news,
    productList,
    cases,
    imageUpload,
    navBar
  },
  data () {
    return {
      logoUrl: 'https://gss0.bdstatic.com/-4o3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike180%2C5%2C5%2C180%2C60/sign=bf69a84ff5198618554ae7d62b844516/908fa0ec08fa513d2ae541f0306d55fbb2fbd954.jpg',
      activeTab: 1,
      isOwner: true, // 是否拥有编辑的权限，有编辑的权限长按可以出发编辑界面
      websiteInfo: {
        id: '',
        name: '',
        logo: '',
        logoUrl: '',
        description: '',
        showImages: '',
        showImagesArray: []
      },
      scrollTop: 0
    }
  },
  // 数据加载
  mounted: async function () {
    // 获取用户身份，判断用户是否有编辑的权限
    // 判断当前用户是否为团队管理员
    if (this.$store.state.user.currentTeam) {
      this.isOwner = this.$store.state.user.currentTeam.managerId === this.$store.state.user.userId
    }
    this.getTeamInfo()
  },
  onPageScroll (event) {
    this.scrollTop = event.scrollTop
  },
  methods: {
    changeTab (e) {
      this.$refs['section' + e.mp.detail.index].init()
    },
    getTeamInfo: async function (e) {
      // 先从登录信息中取
      if (this.$store.state.user.currentTeam) {
        // 绑定数据
        // this.bindTeamInfo(this.$store.state.user.currentTeam)
        return
      }
      // 如果缓存里面没有当前团队信息，则再自己取一次
      let teamInfo = await this.http_flyio.get('/api/mnp/1/default_team', {})
      if (teamInfo.ret === 0 && teamInfo.data) {
        this.$store.state.user.currentTeam = teamInfo.data
        // 默认把赋值第一个团队
        // 赋值团队信息
        this.bindTeamInfo(teamInfo.data)
        return true
      }
      // 跳转到团队创建界面
      wx.navigateTo({
        url: '../team/joinTeam/main'
      })
      return false
    },
    bindTeamInfo (data) {
      this.websiteInfo = data
      if (data.logo) {
        this.websiteInfo.logoUrl = process.env.OSS_BASE_URL + data.logo
      }
      this.websiteInfo.showImagesArray = JSON.parse(data.showImages)
      // 默认加载第一个页签
      this.$refs['section0'].init()
    },
    // 上传团队logo
    showUploadImage: async function (uploadImageInfo) {
      this.websiteInfo.logoUrl = uploadImageInfo[0].path
      this.websiteInfo.logo = uploadImageInfo[0].source + '/' + uploadImageInfo[0].fileName

      this.saveTeamInfo()
    },
    // 保存【关于我们】
    saveAboutUs (aboutUs) {
      this.websiteInfo.description = aboutUs
      this.saveTeamInfo()
    },
    // 保存【风采展示】
    saveShowImages (pics) {
      this.websiteInfo.showImages = pics
      this.saveTeamInfo()
    },
    // 保存团队信息
    saveTeamInfo: async function () {
      let res = await flyio.post('/api/mnp/1/save_team', this.websiteInfo)
      if (res.ret !== 0) {
        wx.showToast({
          title: res.msg,
          icon: 'none',
          duration: 4000
        })
        return false
      }
      return true
    }
  }
}
</script>

<style>
  .page{
    background: #fff;
  }
  .header .upload {
    height: 244px;
    width: 100%;
    border: none;
  }
  .header .upload image{
    height: 244px;
    width: 100%;
  }
  .header .upload .default-empty-logo {
    font-size: 230px;
    text-align: center;
    display: block;
  }

  .content{
    display: block;
    padding-top: 0px;
  }

  .content .company-product-list{
    background: #f2f2f2;
  }

</style>
