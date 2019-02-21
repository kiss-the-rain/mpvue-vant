<template>
  <div class="timeline">
    <van-row>
      <van-col span="3">
        <div class="avatar">
          <image :src="timelineData.avatar" mode="scaleToFill"></image>
        </div>
      </van-col>
      <van-col span="20" offset="1">
        <div class="detail">
          <div class="name">{{timelineData.name}}</div>
          <div class="content">{{timelineData.content}}</div>
          <div class="images" >
            <image v-if="timelineData.image" :src="timelineData.image" mode="aspectFit" @click="showImages(timelineData.image)"></image>
          </div>
          <div class="tools">
            <span class="time">3 小时前</span>
            <van-icon class="button-icon" name="ellipsis" @click="handlerShowTool"/>
            <van-transition :show="showTools">
              <div class="button-detail">
                <div class="button-div">
                  <button plain size="mini" open-type="getUserInfo" @getuserinfo="handlerAddLike"><van-icon name="like-o" />&nbsp;赞</button>
                  <button plain size="mini" open-type="getUserInfo" @getuserinfo="handlerAddComment"><van-icon name="chat-o" />&nbsp;评论</button>
                </div>
                <span class="left-arrow"></span>
              </div>
            </van-transition>
          </div>
          <div class="interaction">
            <span class="bottom-arrow"></span>
            <div class="likes" v-if="likeUserNames">
              <van-icon name="like-o" class="heat"/> <span>&nbsp;</span>
              <span>{{likeUserNames}}</span>
            </div>
            <div class="comments">
              <template v-for="comment in comments">
                <p v-if="comment.toUserName" @click="handlerShowDeleteDialog(comment)">
                  <span class="commentUserName">{{comment.userName}}</span>
                  <span> 回复 </span>
                  <span class="commentUserName">{{comment.toUserName}}</span>
                  <span>：{{comment.content}}</span>
                </p>
                <p v-else @click="handlerShowDeleteDialog(comment)">
                  <span class="commentUserName">{{comment.userName}}</span>
                  <span>：{{comment.content}}</span>
                </p>
              </template>
            </div>
          </div>
        </div>
      </van-col>
    </van-row>
    <van-dialog id="van-dialog" />
  </div>
</template>

<script>
// @是 mpvue 的一个别名，指向src目录
import Dialog from '@/../static/vant/dialog/dialog'
export default {
  components: {
    Dialog
  },
  props: {
    index: Number,
    timelineData: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data () {
    return {
      showTools: false,
      comment: {}
    }
  },
  computed: {
    likeUserNames () {
      return this.timelineData.likes && this.timelineData.likes.length > 0 ? this.timelineData.likes.map(it => it.userName).join('，') : ''
    },
    comments () {
      // 需要这样监听，要不然不生效
      return this.timelineData.comments && this.timelineData.comments.length > 0 ? this.timelineData.comments : []
    }
  },
  methods: {
    handlerShowTool () {
      this.showTools = true
    },
    showImages (url) {
      wx.previewImage({ urls: [url], current: url })
    },
    handlerHideTool () {
      this.showTools = false
    },
    async handlerAddLike (e) {
      console.log(e)
      if (e.mp.detail.userInfo) {
        this.$emit('handlerLike', { index: this.index, type: 'add', userId: 4, userName: '莉莉' })
      } else {
        console.log('您拒绝了授权')
      }
    },
    async handlerAddComment (e) {
      console.log(e)
      if (e.mp.detail.userInfo) {
        this.$emit('handlerComment', {
          index: this.index,
          type: 'add',
          commentId: '4',
          userId: 4,
          userName: '莉莉',
          content: '🙏🙏🙏🙏🙏'
        })
      } else {
        console.log('您拒绝了授权')
      }
    },
    async handlerDelComment (commentId) {
      // 删除评论
      this.$emit('handlerComment', {
        index: this.index,
        type: 'delete',
        commentId: commentId,
        userId: 4,
        userName: '莉莉',
        content: '🙏🙏🙏🙏🙏'
      })
    },
    handlerShowDeleteDialog (comment) {
      console.log(comment)
      // TODO 判断这条消息的发送者

      Dialog.confirm({
        message: comment.content,
        confirmButtonText: '删除',
        closeOnClickOverlay: true,
        showConfirmButton: true,
        showCancelButton: true
      }).then(() => {
        // on confirm
        this.handlerDelComment(comment.commentId)
      }).catch(() => {
        // on cancel
        console.log('取消删除')
      })
      this.comment = comment
    }
  }
}
</script>

<style lang="less" scoped>
  .timeline {
    padding: 10px;
    border-bottom: 1px solid #eee;
  }
  .timeline .avatar {
    border: 1px solid #eee;
    border-radius: 4px;
    width: 50px;
    height: 50px;

    image {
      width: 100%;
      height: 100%;
    }
  }
  .timeline .detail {
    width:100%;
    margin-top: 0px;

    .name {
      font-size:16px;
      font-weight:bold;
      color: #000080;
    }
    .content {
      margin-top: 10px;
    }
    .content {
      margin-top: 10px;
    }
    .images image{
      max-width: 250px;
    }

    // 点赞和评论 工具
    .tools {
      margin-top: 10px;

      .time{
        font-size:12px;
      }
      .button-icon {
        background-color:#eeeeee;
        padding:2px 7px 0px 7px;
        border-radius: 4px;
        float:right;
      }
      .button-detail {
        margin-top: -27px;
        float: right;
        width: 150px;

        .button-div {
          float: left;
          width: 140px;
          background-color: rgba(00,00,00,.75);
        }
        .button-div button {
          border-color: transparent;
          color: #fff;
          font-weight: bold;
          padding-top:4px;
        }
        .left-arrow{
          position: relative;
          top:11px;
          float: left;
          font-size: 0;
          vertical-align: -3px;
          border-color: rgba(00,00,00,.75);
          border-width: 8px 0 8px 8px;
          border-style: solid;
          border-left-style: solid;
          border-top-color: transparent;
          border-bottom-color: transparent;
        }
      }
    }

    // 点赞和评论 内容
    .interaction{

      .bottom-arrow{
        margin-left: 10px;
        font-size: 0;
        line-height: 15px;
        border-width: 8px;
        border-color: #eeeeee;
        border-top-width: 0;
        border-style: solid;
        border-bottom-style: solid;
        border-left-color: transparent;
        border-right-color: transparent;
      }
      .likes{
        border-bottom: 1px solid #ddd;
        background-color:#eeeeee;
        padding:4px;
        color: #000080;
      }
      .likes .heat{
        color: #ed4014;
        font-size: 18px;
        vertical-align:-2px;
      }
      .comments p{
        background-color:#eeeeee;
        padding:4px 4px 8px 4px;
      }
      .comments .commentUserName {
        color: #000080;
      }
    }

  }

</style>
