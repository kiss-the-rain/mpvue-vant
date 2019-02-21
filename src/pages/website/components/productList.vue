<template>
  <scroll-view :style="{'height': '500px'}" :scroll-y="true" class="product-list" @scrolltolower="scrollToLower" lower-threshold="0px">
    <van-row>
      <van-col span="12" class="product-card" v-for="(item, index) in productList" :key="index">
        <div class="product-card">
          <productCard
                  :num="item.num"
                  :tag="item.tag"
                  :price="item.price"
                  :desc="item.desc"
                  :title="item.title"
                  :thumb="item.thumb"
          ></productCard>
        </div>
      </van-col>
    </van-row>

    <div v-if="showLoading" class="loading">
      <van-loading class="loading" type="spinner" />
    </div>

    <div v-if="showUnderscore" class="underscore">
      <span class="line"></span>
      <span class="txt">我是有底线的</span>
      <span class="line"></span>
    </div>
  </scroll-view>
</template>

<script>
import productCard from '@/components/productCard.vue'
import flyio from '@/utils/httpFlyio'

export default {
  name: 'productList',
  components: {
    productCard
  },
  data () {
    return {
      isOwner: false, // 是否拥有编辑的权限，有编辑的权限长按可以出发编辑界面
      showLoading: false,
      showUnderScore: false,
      pageIndex: 1,
      pageSize: 10,
      productList: [
        {
          title: '商品标题',
          tag: '标签',
          price: 123,
          desc: '运动前后不拉伸三个月尽毁人生观点全身拉伸图解教程规范',
          thumb: '//img.yzcdn.cn/upload_files/2017/07/02/af5b9f44deaeb68000d7e4a711160c53.jpg',
          num: 1
        },
        {
          title: '商品标题',
          tag: '标签',
          price: 123,
          desc: '运动前后不拉伸三个月尽毁人生观点全身拉伸图解教程规范',
          thumb: '//img.yzcdn.cn/upload_files/2017/07/02/af5b9f44deaeb68000d7e4a711160c53.jpg',
          num: 1
        },
        {
          title: '商品标题',
          tag: '标签',
          price: 123,
          desc: '运动前后不拉伸三个月尽毁人生观点全身拉伸图解教程规范',
          thumb: '//img.yzcdn.cn/upload_files/2017/07/02/af5b9f44deaeb68000d7e4a711160c53.jpg',
          num: 1
        },
        {
          title: '商品标题',
          tag: '标签',
          price: 123,
          desc: '运动前后不拉伸三个月尽毁人生观点全身拉伸图解教程规范',
          thumb: '//img.yzcdn.cn/upload_files/2017/07/02/af5b9f44deaeb68000d7e4a711160c53.jpg',
          num: 1
        }
      ]
    }
  },
  onLoad: async function () {

  },
  mounted () {
    // 获取用户身份，判断用户是否有编辑的权限
    if (this.$store.state.user.currentTeam) {
      this.isOwner = this.$store.state.user.currentTeam.managerId === this.$store.state.user.userId
    }
  },
  methods: {
    // 屏幕滚动到最下面拉去下一页的数据
    scrollToLower () {
      this.getTeamProducts(++this.pageIndex)
    },
    init () {
      this.isSystemUser = this.$store.state.user.isSystemUser

      this.getTeamProducts()
    },
    getTeamProducts: async function (pageIndex) {
      let data = {
        teamId: this.$store.state.user.currentTeam.teamId,
        pageIndex: pageIndex || 1,
        pageSize: this.pageSize,
        filter: JSON.stringify({}),
        sort: JSON.stringify({ id: 1 })
      }

      this.showLoading = true
      let res = await flyio.post('/api/mnp/1/get_team_products', data)
      if (res.ret !== 0) {
        wx.showToast({
          title: res.msg,
          icon: 'none',
          duration: 4000
        })
        // 暂时测试使用
        this.productList = this.productList.concat(this.productList)
      }
      this.showLoading = false
    }
  },
  props: {
  }
}
</script>

<style lang="less" scoped>
.product-list{
  margin: 5px 10px;

  .loading {
    width: 100%;
    text-align: center;
    padding-top: 5px;
  }

  .underscore {
    padding: 20px 0px;
    height: 40px;
    line-height: 40px;
    text-align: center;

    .line {
      display: inline-block;
      width: 100px;
      border-top: 1px solid #ccc ;
    }
    .txt {
      color: #ccc;
      font-size: 12px;
      padding: 0 5px;
      vertical-align: -3px;
    }
  }

}
</style>