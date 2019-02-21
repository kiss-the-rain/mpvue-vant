<template>
  <div :class="warpClass" :style="navStyle">
    <div class="nav-content">
      <div class="nav-title">{{title}}</div>
      <div class="nav-tool-bar">
        <div v-if="showBack" class="tool-bar-item">
          <van-icon custom-style="font-size:25px;line-height: 36px;" name="arrow-left" @click="navBack"></van-icon>
        </div>
        <div v-if="!showBack" class="tool-bar-item" @click="toUserCenter">
          <image class="user-mini-logo" :src="avatarUrl"></image>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'navBar',
    components: {},
    data () {
      return {
        warpClass: 'nav-wrap'
      }
    },
    // adjust tab position
    onPageScroll: function onScroll (distance) {
      // 当页面滚动的距离大于容器到页面顶部的距离的时候固定容器位置
      if (distance.scrollTop > 0) { this.warpClass = 'nav-wrap sticky' } else { this.warpClass = 'nav-wrap' }
    },
    methods: {
      navBack () {
        wx.navigateBack()
      },
      toUserCenter () {
        wx.navigateTo({
          url: '../user/main'
        })
      },
      // 返回到首页
      _backhome () {
        wx.switchTab({
          url: '/pages/index/index'
        })
      }
    },
    computed: {
      avatarUrl () {
        return this.$store.state.user.card.avatar ? this.$store.state.user.card.avatar : '/static/images/icon_head.png'
      },
      navStyle () {
        return 'padding-top: ' + (wx.getSystemInfoSync()['statusBarHeight']) + 'px'
      },
      offsetTop () {
        return wx.getSystemInfoSync()['statusBarHeight']
      }
    },
    props: {
      title: {
        type: String,
        value: ''
      },
      showBack: {
        type: Boolean,
        value: false
      }
    }
  }
</script>


<style>
  /* 顶部要固定定位   标题要居中   自定义按钮和标题要和右边微信原生的胶囊上下对齐 */
  .nav-wrap {
    width: 100%;
    background: #fff;
    color: #000;
    z-index: 9999999;
    height: 40px;
  }
  .nav-wrap.sticky{
    position: fixed;
    top: 0;
  }
  .nav-wrap .nav-content{
    width: 100%;
    height: 100%;
    position: relative;
  }
  .nav-wrap .nav-tool-bar {
    position: absolute;
    bottom: 2px;
    width: 100%;
    height: 36px;
  }
  .nav-wrap .nav-tool-bar .tool-bar-item{
    float: left;
    width: 36px;
    height: 36px;
  }
  .nav-wrap .user-mini-logo {
    width: 30px;
    height: 30px;
    border-radius: 15px;
    margin: 5px 10px;
  }
  /* 标题要居中 */
  .nav-title {
    position: absolute;
    text-align: center;
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    left: 0;
    right: 0;
    bottom: 10px;
    margin: auto;
    font-size: 14px;
    color: #2c2b2b;
    font-weight: 600;
  }

</style>
