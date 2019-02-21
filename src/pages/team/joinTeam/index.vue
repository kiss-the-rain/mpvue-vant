<template>
    <div class="no-bg-page team">
        <navBar title="加入团队" showBack="true"></navBar>
        <div class="content">
            <van-search placeholder="请输入搜索关键词" show-action  @search="onSearch" @cancel="showSearchResult = false" />
            <div v-if="showSearchResult" class="search-result">
                <ul v-if="searchResult.length > 0" class="search-team-list">
                    <li v-for="(item,index) in searchResult" :key="index" class="team-item" @click="joinTeam(item.teamId,item.name)">
                        {{item.name}}
                    </li>
                </ul>
                <div v-else class="empty-result">
                    没有符合条件搜索结果
                </div>
            </div>
            <div class="tips">
                推荐热门公司/品牌 <van-button size="small" class="button" type="default" @click="dialogInfo.showEditTeamDialog = true">创建团队</van-button>
            </div>
            <div class="hot-team-list">
                <van-button v-for="(item,index) in hotTeams" :key="index" class="team-item" size="small" round type="default" @click="joinTeam(item.teamId,item.name)">
                    {{item.name}}
                </van-button>
                <div class="clear"></div>
            </div>
        </div>

        <div class="footer">
            <van-button class="button" size="large" type="warning">完成</van-button>
        </div>



        <van-dialog
                use-slot
                async-close
                :show="dialogInfo.showEditTeamDialog"
                :title="dialogInfo.dialogTitle"
                show-cancel-button
                @close="onSaveTeamInfo"
        >
            <van-cell-group>
                <van-field
                        name="name"
                        :value="dialogInfo.teamName"
                        @change="fieldInput($event,'teamName')"
                        label="团队名称"
                        placeholder="请输入团队名称"
                />
            </van-cell-group>
        </van-dialog>

        <van-dialog id="join-team-dialog"></van-dialog>
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
          showSearchResult: false,
          searchResult: [],
          hotTeams: [
          ],
          dialogInfo: {
            showEditTeamDialog: false,
            teamName: '',
            dialogTitle: '创建团队'
          }

        }
      },
      onLoad: async function () {
        // 获取热门团队信息
        let res = await flyio.get('/api/mnp/1/hot_teams', {})
        if (res.ret !== 0 || !res.data) {
          wx.showToast({
            title: '获取团队信息失败',
            icon: 'none',
            duration: 4000
          })
          return false
        }
        this.hotTeams = res.data.records
      },
      methods: {
        // 输入框输入的时候更改data中对应的数据
        fieldInput (event, target) {
          this.dialogInfo[target] = event.mp.detail
        },
        onSearch: async function (event) {
          let searchValue = event.mp.detail
          // 搜索团队
          let res = await flyio.get('/api/mnp/1/search_teams', {name: searchValue})
          if (res.ret !== 0 || !res.data) {
            wx.showToast({
              title: '获取团队信息失败',
              icon: 'none',
              duration: 4000
            })
            return false
          }
          // 显示搜索结果
          this.showSearchResult = true
          this.searchResult = res.data.records
        },
        // 保存团队信息
        onSaveTeamInfo: async function (event) {
          if (event.mp.detail === 'confirm') {
            wx.showToast({
              title: '提交中...',
              icon: 'loading',
              mask: true
            })
            const result = await flyio.post('/api/mnp/1/create_team', {name: this.dialogInfo.teamName})
            if (result.ret !== 0) {
              wx.showToast({
                title: result.msg,
                icon: 'none',
                mask: true
              })
            }
          }
          this.dialogInfo.teamName = ''
          this.dialogInfo.showEditTeamDialog = false
        },
        // 加入团队
        joinTeam (teamId, teamName) {
          Dialog.confirm({
            selector: '#join-team-dialog',
            title: '确认申请加入[' + teamName + ']',
            message: ' ',
            closeOnClickOverlay: true,
            showConfirmButton: true,
            showCancelButton: true
          }).then(async () => {
            // on confirm 加入选中的团队
            wx.showToast({
              title: '提交中...',
              icon: 'loading',
              mask: true
            })
            const result = await flyio.post('/api/mnp/1/join_team', {teamId: teamId})
            if (result.ret !== 0) {
              wx.showToast({
                title: result.msg || '申请加入团队失败',
                icon: 'none',
                mask: true
              })
            }
          }).catch(() => {
            // on cancel
            console.log('取消申请加入改团队')
          })
        }
      }

    }
</script>

<style>
.team{
    display: flex;
    flex-direction: column;
    height: 100%;
}
.team .content{
    flex: 1 1;
    height: 100%;
    position: relative;
}

/* 团队搜索结果 begin */
.team .content .search-result{
    position: absolute;
    top: 43px;
    z-index: 9999;
    width: 100%;
    background-color: #fff;
}
.team .content .search-result .empty-result{
    height: 150px;
    font-size: 14px;
    width: 100%;
    text-align: center;
    line-height: 150px;
}
.team .content .search-team-list{

}
.team .content .search-team-list .team-item{
    display: block;
    border-bottom: 1px solid #ccc;
    font-size: 12px;
    text-indent: 20px;
    height: 40px;
    line-height: 40px;
}

/* 团队搜索结果 end */

.team .content .tips{
    margin: 5px 10px;
}
.team .content .hot-team-list{
    display: block;
    width: 100%;
    height: auto;
}
.team .content .hot-team-list .team-item{
    margin: 5px;
    display: block;
    float: left;
}
.team .content .hot-team-list .clear{
    clear: both;
}



.team .footer{
    height: 50px;
    flex: 0 0 auto;
    padding: 5px 10px;
}

.footer .button {
}
</style>
