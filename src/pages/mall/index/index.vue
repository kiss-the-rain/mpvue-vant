<template>
  <div class="no-bg-page">
    <navBar title="商城"></navBar>
    <van-cell title="全部分类" @click="showCategory">
      <van-icon
              slot="right-icon"
              name="bars"
      />
    </van-cell>
    <van-popup
            :show="isShowCategory"
            position="right"
            :overlay="true"
            @close="onClose"
    >
      内容
    </van-popup>


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


  </div>
</template>

<script>
import productCard from '@/components/productCard.vue'
import navBar from '@/components/navBar'
export default {
  components: {
    productCard,
    navBar
  },
  data () {
    return {
      isShowCategory: false,
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
  methods: {
    showCategory () {
      this.isShowCategory = true
    },
    onClose () {
      this.isShowCategory = false
    }
  }
}
</script>


<style>

</style>
