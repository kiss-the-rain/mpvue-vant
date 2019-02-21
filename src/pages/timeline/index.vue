<template>
  <div class="page" @touchstart="handlerHideTools">
    <navBar title="动态"></navBar>
    <div class="header">
      <image :src="coverImage" @click="handlerChangeCoverImage"></image>
      <div class="add" :style="shareStyle" @click="handlerShare"><van-icon name="edit" /> 分享</div>
      <div class="avatar" @click="handlerShare">
        <open-data type="userAvatarUrl"></open-data>
      </div>
    </div>
    <div class="detail">
      <template v-for="(timelineData,index) in timelineDatas">
        <timeline :ref="'timeline' + index"
                  :index=index
                  :timelineData=timelineData
                  @handlerLike="handlerLike"
                  @handlerComment="handlerComment"
        ></timeline>
      </template>
    </div>
    <div class="underscore">
      <span class="line"></span>
      <span class="txt">我是有底线的</span>
      <span class="line"></span>
    </div>
    <van-dialog id="van-dialog" />
    <van-dialog id="change-cover-dialog"></van-dialog>
    <imageUpload ref="changeCoverImage" count="1" :hideButton="true" @afterUpload="afterChangeCoverImage"></imageUpload>
  </div>
</template>

<script>
import timeline from '../../components/timeline'
import Dialog from '@/../static/vant/dialog/dialog'
import imageUpload from '../../components/upload'
import store from '../../store/index'
import httpFlyio from '../../utils/httpFlyio'
import navBar from '@/components/navBar'

export default {
  components: {
    timeline,
    imageUpload,
    navBar
  },
  data () {
    return {
      timelineDatas: [
        {
          name: '爸爸',
          avatar: 'https://objie.oss-cn-shenzhen.aliyuncs.com/timeline.jpg',
          image: 'https://objie.oss-cn-shenzhen.aliyuncs.com/timeline.jpg',
          content: '保持纵横比缩放图片，只保证图片的短边能完全显示出来。也就是说，图片通常只在水平或垂直方向是完整的，另一个方向将会发生截取。😥',
          comments: [
            {
              commentId: '1',
              userId: '1',
              userName: '张三',
              content: '很 nice 哦'
            }, {
              commentId: '2',
              userId: '2',
              userName: '李雷',
              content: 'so cool'
            }, {
              commentId: '3',
              userId: '3',
              userName: '韩梅梅',
              toUserId: '2',
              toUserName: '李雷',
              content: '你确定？'
            }
          ],
          likes: [
            {
              userId: '1',
              userName: '李雷'
            }, {
              userId: '2',
              userName: '韩梅梅'
            }, {
              userId: '3',
              userName: 'lucy'
            }
          ],
          createdAt: ''
        },
        {
          name: '妈妈',
          avatar: 'https://img.yzcdn.cn/vant-weapp/index-201808121630.png',
          image: 'https://img.yzcdn.cn/vant-weapp/index-201808121630.png',
          content: '分布式关系型数据库DRDS只读实例重大升级',
          comments: [
            {
              commentId: '1',
              userId: '1',
              userName: '张三',
              content: '提供多种只读实例类型，可抵御超高并发的访问压力、加速复杂查询的执行效率!'
            }, {
              commentId: '2',
              userId: '2',
              userName: '李雷',
              content: '😥 😋 😍'
            }, {
              commentId: '3',
              userId: '3',
              userName: '王大锤',
              content: '🙏🙏🙏🙏🙏'
            }
          ],
          likes: [
            {
              userId: '1',
              userName: '李雷'
            }, {
              userId: '2',
              userName: '韩梅梅'
            }, {
              userId: '3',
              userName: 'lucy'
            }
          ],
          createdAt: ''
        },
        {
          name: '宝宝',
          avatar: 'https://img.yzcdn.cn/vant-weapp/qrcode-201808101114.jpg',
          content: '咿呀咿呀',
          comments: [
            {
              commentId: '1',
              userId: '1',
              userName: '张三',
              content: '爸爸妈妈最爱我'
            }, {
              commentId: '2',
              userId: '2',
              userName: '李雷',
              content: '可我总是不明白'
            }, {
              commentId: '3',
              userId: '3',
              userName: '王大锤',
              content: '爱是什么？'
            }
          ],
          likes: [],
          createdAt: ''
        }
      ]
    }
  },
  methods: {
    handlerHideTools () {
      // 隐藏按钮
      Object.keys(this.$refs).forEach(it => {
        if (it.startsWith('timeline')) {
          this.$refs[it][0].handlerHideTool()
        }
      })
    },
    handlerLike (like) {
      // 增减点赞
      console.log(like)
      if (like.type === 'add') {
        this.timelineDatas[like.index].likes.push(
          {
            userId: like.userId,
            userName: like.userName
          }
        )
      } else {
        this.timelineDatas[like.index].likes.push(
          {
            userId: like.userId,
            userName: like.userName
          }
        )
      }
    },
    handlerComment (comment) {
      // 增减评论
      console.log(comment)
      if (comment.type === 'add') {
        this.timelineDatas[comment.index].comments.push(
          {
            userId: comment.userId,
            userName: comment.userName,
            content: comment.content
          }
        )
      } else {
        this.timelineDatas[comment.index].comments.push(
          {
            userId: comment.userId,
            userName: comment.userName,
            content: comment.content
          }
        )
      }
    },
    handlerShare () {
      wx.navigateTo({
        url: './create/main'
      })
    },
    handlerChangeCoverImage () {
      // 修改封面，message 保留空格
      Dialog.confirm({
        selector: '#change-cover-dialog',
        title: '更换封面',
        message: ' ',
        closeOnClickOverlay: true,
        showConfirmButton: true,
        showCancelButton: true
      }).then(async () => {
        // on confirm
        this.$refs['changeCoverImage'].chooseAndUpload()
      }).catch(() => {
        // on cancel
        console.log('取消删除')
      })
    },
    async afterChangeCoverImage (list) {
      // 封面图片上传之后的处理
      if (list.length > 0) {
        console.log(list)
        store.commit('changeCoverImage', list[0])
        // 更新封面配置
        const result = await httpFlyio.post('/api/mnp/1/save_timeline_setting', {
          cardId: this.$store.state.card.cardId,
          image: list[0].fileKey
        })
        console.log(result)
      }
    }
  },
  computed: {
    shareStyle () {
      return { height: (wx.getSystemInfo() - 10) + 'px' }
    },
    isOwner () {
      // 是否拥有编辑的权限，有编辑的权限长按可以出发编辑界面
      return true // this.$store.state.user.isOwner
    },
    coverImage () {
      return this.$store.state.user.timelineSetting.card.coverImage
    }
  }
}
</script>

<style lang="less" scoped>
  .page{
    background: #fff;

    .header {
      image {
        height: 240px;
        width: 100%;
        border: none;
      }
      .add {
        padding: 20px;
        width: 100px;
        position: absolute;
        top: 10px;
        color: #fff;
      }
      .avatar {
        border: 1px solid #eee;
        border-radius: 8px;
        width: 100px;
        height: 100px;
        position: absolute;
        right:10px;
        top:170px;
        vertical-align: middle;
        text-align: center;
        background: #ccc;
        color: #fff;
        white-space: nowrap;
        overflow: hidden;
      }
    }

    .detail {
      margin-top: 35px;
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
