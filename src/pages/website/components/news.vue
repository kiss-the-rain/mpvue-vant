<template>
  <div class="news-list">
    <div v-for="(item,index) in news" :key="index" class="news-item" @click="showNewsDetail">
      <div class="icon">
        <img :src="item.thumb"/>
      </div>
      <div class="title">
        {{item.title}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'news',
  data () {
    return {
      isOwner: false, // 是否拥有编辑的权限，有编辑的权限长按可以出发编辑界面
      news: [
        {
          title: '运动前后不拉伸三个月尽毁人生观点全身拉伸图解教程规范',
          thumb: 'https://p3.pstatp.com/list/190x124/pgc-image/RCTwSMb89DHoVm',
          href: 'https://www.baidu.com/?keyword=123'
        },
        {
          title: '由各种物质组成的巨型球状天体，叫做星球',
          thumb: 'https://p3.pstatp.com/list/190x124/pgc-image/RCTwSMb89DHoVm',
          href: 'https://www.baidu.com/?keyword=123'
        },
        {
          title: '那些归家晚的人都有秘密，来看看你知道几条',
          thumb: 'https://p3.pstatp.com/list/190x124/pgc-image/RCTwSMb89DHoVm',
          href: 'https://www.baidu.com/?keyword=123'
        },
        {
          title: '刷记录，各地楼市调控达450次，销售额破14万亿',
          thumb: 'https://p3.pstatp.com/list/190x124/pgc-image/RCTwSMb89DHoVm',
          href: 'https://www.baidu.com/?keyword=123'
        },
        {
          title: '运动前后不拉伸三个月尽毁人生观点全身拉伸图解教程规范',
          thumb: 'https://p3.pstatp.com/list/190x124/pgc-image/RCTwSMb89DHoVm',
          href: 'https://www.baidu.com/?keyword=123'
        }
      ]
    }
  },
  onload () {
    // 判断当前用户是否为团队管理员
    if (this.$store.state.user.currentTeam) {
      this.isOwner = this.$store.state.user.currentTeam.managerId === this.$store.state.user.userId
    }
  },
  mounted () {
  },
  methods: {
    init () {

    },
    showNewsDetail (e) {

    }
  },
  props: {
    info: String
  }
}
</script>

<style>
.news-list{
  font-size: 14px;
}
.news-list .news-item{
  background: #fff;
  margin: 0 10px;
  border-bottom: 1px solid #eee;
  height: 60px;
  margin: 5px;
}
.news-list .news-item .title{
  margin-right: 60px;
}
.news-list .news-item .icon{
  width: 50px;
  height: 50px;
  border-radius: 5px;
  overflow: hidden;
  float: right;
}
.news-list .news-item .right image{
  width: 50px;
  height: 50px;
}
</style>