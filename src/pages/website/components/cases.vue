<template>
  <div class="cases-list">
    <div class="empty-msg">
      <p>还没有添加文章</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'news',
  data () {
    return {
      isSystemUser: false,
      isOwner: false, // 是否拥有编辑的权限，有编辑的权限长按可以出发编辑界面
      cases: [
      ]
    }
  },
  onload () {
    this.isSystemUser = true
  },
  mounted () {
    // 获取用户身份，判断用户是否有编辑的权限
    this.isOwner = false
  },
  methods: {
  },
  props: {
    info: String
  }
}
</script>

<style>
  .cases-list .empty-msg{
    font-size: 12px;
    margin-top: 40px;
    text-align: center;
  }
</style>