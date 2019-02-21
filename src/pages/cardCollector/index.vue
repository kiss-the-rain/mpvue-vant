<template>
  <div class="no-bg-page">
    <navBar title="名片夹" showBack="true"></navBar>
    <van-search placeholder="搜索名片" v-model="searchContent" />
    <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
    >
      <van-card
              v-for="(item,key) in cardList"
              :key="key"
              num="2"
              price="2.00"
              desc="描述信息"
              :title="item.fullName"
              :thumb="imageURL"
      >
        <div slot="thumb">
          <van-button round type="primary">吕</van-button>
        </div>
        <div slot="footer">

        </div>
      </van-card>
    </van-list>
  </div>
</template>

<script>
import navBar from '@/components/navBar'
export default {
  components: {
    navBar
  },
  data () {
    return {
      searchContent: '',
      cardList: [
        {id: 1, fullName: '哈哈', firstName: '吕', phone: '18816829963', position: '程序员', companyName: '脸盆网', buildDate: '2018-12-21'},
        {id: 2, fullName: '呵呵', firstName: '陈', phone: '123456778', position: '程序员', companyName: '脸盆网', buildDate: '2018-12-21'},
        {id: 2, fullName: '呵呵', firstName: '陈', phone: '123456778', position: '程序员', companyName: '脸盆网', buildDate: '2018-12-21'},
        {id: 2, fullName: '呵呵', firstName: '陈', phone: '123456778', position: '程序员', companyName: '脸盆网', buildDate: '2018-12-21'},
        {id: 2, fullName: '呵呵', firstName: '陈', phone: '123456778', position: '程序员', companyName: '脸盆网', buildDate: '2018-12-21'},
        {id: 2, fullName: '呵呵', firstName: '陈', phone: '123456778', position: '程序员', companyName: '脸盆网', buildDate: '2018-12-21'},
        {id: 2, fullName: '呵呵', firstName: '陈', phone: '123456778', position: '程序员', companyName: '脸盆网', buildDate: '2018-12-21'}
      ]
    }
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style>
.counter-warp {
  text-align: center;
  margin-top: 100px;
}
.home {
  display: inline-block;
  margin: 100px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}
</style>
