<template>
    <div class="no-bg-page team-apply-list">
        <navBar title="团队申请记录" showBack="true"></navBar>
        <van-tabs sticky animated class="content" :active="active" :scroll-top="scrollTop" @change="changeTab">
            <van-tab title="全部">
                <div class="apply-item" v-for="(item,index) in allApply" :key="index">
                    <div class="apply-item-checkbox">
                      <van-checkbox :value="item.checked" @change="onChangeCheckBox(item)"></van-checkbox>
                    </div>
                    <div class="apply-item-content">
                        {{item.userName}}申请加入{{item.teamName}}
                    </div>
                </div>
            </van-tab>
            <van-tab title="待处理">
                <div class="apply-item" v-for="(item,index) in pendingApply" :key="index">
                    <div class="apply-item-checkbox">
                        <van-checkbox :value="item.checked" @change="onChangeCheckBox(item)"></van-checkbox>
                    </div>
                    <div class="apply-item-content">
                        {{item.userName}}申请加入【{{item.teamName}}】
                    </div>
                </div>
            </van-tab>
            <van-tab title="已处理">
                <div class="apply-item" v-for="(item,index) in processedApply" :key="index">
                    <div class="apply-item-checkbox">
                        <van-checkbox :value="item.checked" @change="onChangeCheckBox(item)"></van-checkbox>
                    </div>
                    <div class="apply-item-content">
                        {{item.userName}}申请加入【{{item.teamName}}】
                    </div>
                </div>
            </van-tab>
            <van-tab title="我的申请">
                <div class="apply-item" v-for="(item,index) in myApply" :key="index">
                    <div class="apply-item-checkbox">
                        <van-checkbox :value="item.checked" @change="onChangeCheckBox(item)"></van-checkbox>
                    </div>
                    <div class="apply-item-content">
                        {{item.userName}}申请加入【{{item.teamName}}】
                    </div>
                </div>
            </van-tab>
        </van-tabs>
        <div class="tool-bar">
            <van-button size="small" @click="agreeApply" v-if="canEdit" class="button">同意</van-button>
            <van-button size="small" @click="refuseApply" v-if="canEdit" class="button">拒绝</van-button>
            <van-button size="small" @click="deleteApply" v-if="canDelete" class="button">删除</van-button>
        </div>

    </div>
</template>

<script>
import Dialog from '@/../static/vant/dialog/dialog'
import flyio from '../../../utils/httpFlyio'
import navBar from '@/components/navBar'
export default {
  components: {
    Dialog,
    navBar
  },
  data () {
    return {
      canEdit: true, // 是否可以编辑
      canDelete: false, // 是否可以删除
      allApply: [{checked: false, userId: 1, userName: '张三', teamId: 1, teamName: '呵呵哒'}, {checked: false, userId: 1, userName: '张三', teamId: 1, teamName: '呵呵哒'}],
      pendingApply: [{checked: false, userId: 1, userName: '张三', teamId: 1, teamName: '呵呵哒'}],
      processedApply: [{checked: false, userId: 1, userName: '张三', teamId: 1, teamName: '呵呵哒'}],
      myApply: [{checked: false, userId: 1, userName: '张三', teamId: 1, teamName: '呵呵哒'}],
      checkedApplyItems: []
    }
  },
  onLoad: async function () {
    // 获取团队申请信息
    let res = await flyio.get('/api/mnp/1/team_apply', {})
    if (res.ret !== 0 || !res.data) {
      wx.showToast({
        title: '获取团队申请失败',
        icon: 'none',
        duration: 4000
      })
      return false
    }
    this.allApply = res.data.records
  },
  methods: {
    // 更改tab页签，显示隐藏不同的操作按钮
    changeTab (event) {
      let tabIndex = event.mp.detail.index
      if (tabIndex === 0 || tabIndex === 1) {
        this.canEdit = true
        this.canDelete = false
      } else if (tabIndex === 2) {
        this.canEdit = false
        this.canDelete = false
      } else {
        this.canEdit = false
        this.canDelete = true
      }

      // 更换页签选中项清空
      this.checkedApplyItems.length = 0
    },
    onChangeCheckBox (item) {
      item.checked = !item.checked
      if (item.checked) { this.checkedApplyItems.push(item) }
    },
    // 同意用户加入团队
    agreeApply () {
      if (this.checkedApplyItems.length === 0) {
        wx.showToast({
          title: '请先选中要同意的申请项',
          icon: 'none',
          duration: 4000
        })
        return
      }
      this.saveApply('agree_team_apply')
    },
    // 拒绝用户加入团队
    refuseApply () {
      if (this.checkedApplyItems.length === 0) {
        wx.showToast({
          title: '请先选中要拒绝的申请项',
          icon: 'none',
          duration: 4000
        })
        return
      }
      this.saveApply('refuse_team_apply')
    },
    // 删除申请
    deleteApply () {
      if (this.checkedApplyItems.length === 0) {
        wx.showToast({
          title: '请先选中要删除的申请项',
          icon: 'none',
          duration: 4000
        })
        return
      }
      this.saveApply('delete_team_apply')
    },
    saveApply: async function (action) {
      console.log(action)
      // 获取热门团队信息
      let res = await flyio.post('/api/mnp/1/' + action, {data: this.checkedApplyItems})
      if (res.ret !== 0 || !res.data) {
        wx.showToast({
          title: '提交失败',
          icon: 'none',
          duration: 4000
        })
        return false
      }
    }
  }

}
</script>

<style>
.team-apply-list{
    display: flex;
    flex-direction: column;
    height: 100%;
}
.team-apply-list .tool-bar{
    height: 50px;
    flex: 0 0 auto;
    padding: 5px 10px;
    border-top: 1px solid #eee;
}
.team-apply-list .content{
    flex: 1 1;
    height: 100%;
    position: relative;
}
.team-apply-list .tool-bar .button{
    display: block;
    margin: 5px;
    float: right;
}
.team-apply-list .apply-item{
    font-size: 13px;
    width: 100%;
    height: 50px;
    border-bottom: 1px solid #eee;
}
.team-apply-list .apply-item .apply-item-checkbox{
    width:100px;
    height: 50px;
    float: left;
    line-height: 50px;
    text-align: center;
}
.team-apply-list .apply-item .apply-item-content{
    float:left;
    line-height: 50px;
}

</style>
