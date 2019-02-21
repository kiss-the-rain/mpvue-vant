<template>
  <div class="website-index">
    <div class="section">
    <!-- 关于我们 -->
      <van-cell
              class="section-title"
              title="关于我们"
              :value="isOwner ? '编辑' : ''"
              :is-link="isOwner"
              @click="editArticle"
      />
      <div class="section-content">

        <div v-if="info" class="section-article">
          {{info}}
        </div>
        <div v-else-if="isOwner">
          <!-- 【关于我们】是空，且有编辑的权限 -->
          <div class="edit-msg" @click="editArticle">
            <van-icon name="edit" />添加品牌介绍
          </div>
        </div>
        <div v-else>
          <!-- 【关于我们】为空，且没有编辑权限 -->
          <div class="empty-msg">
            <p>还没有添加文章</p>
          </div>
        </div>
      </div>

      <van-popup
              :show="showEditDialog"
              position="right"
              overlay="false"
              @close="onCloseEditDialog"
              class="edit-about-us"
      >
        <div class="articleEditDialog">
          <textarea v-model="info" placeholder="品牌介绍"></textarea>
          <van-button type="primary" size="large" @click="saveArticle">确认</van-button>
        </div>
      </van-popup>

    </div>

    <!-- 风采展示 -->
    <div class="section">
      <van-cell
              class="section-title"
              title="风采展示"
      />
      <div class="section-content">
        <div class="pic-list" v-if="showPics && showPics.length > 0">
          <div v-for="(url,index) in showPics" :key="index">
            <image :src="imageBaseUrl + url" class="content-single-img" @longpress="deletePic(index)" />
          </div>
        </div>
        <div v-else>
          <!-- 【风采展示】为空，且没有编辑权限 -->
          <div class="empty-msg">
            <p>还没有添加图片</p>
          </div>
        </div>
        <div class="add-elegant-pic" v-if="isOwner">
          <imageUpload @afterUpload="showUploadImage">
            <div slot="icon">
              <div class="add-tip">
                <van-icon name="plus" />添加图片<br/>
              </div>
              长按图片即可删除
            </div>
          </imageUpload>
        </div>
      </div>

      <van-dialog id="delete-pic-dialog"></van-dialog>

    </div>
  </div>
</template>

<script>
import imageUpload from '@/components/upload'
import Dialog from '@/../static/vant/dialog/dialog'
export default {
  components: {
    imageUpload,
    Dialog
  },
  name: 'websiteIndex',
  data () {
    return {
      isOwner: false, // 是否拥有编辑的权限，有编辑的权限长按可以出发编辑界面
      showEditDialog: false,
      imageBaseUrl: process.env.OSS_BASE_URL,
      showPics: []
    }
  },
  onLoad () {
  },
  mounted () {
  },
  methods: {
    init () {
      // 判断当前用户是否为团队管理员
      if (this.$store.state.user.currentTeam) {
        this.isOwner = this.$store.state.user.currentTeam.managerId === this.$store.state.user.userId
      }
      this.showPics = this.pics
    },
    // 编辑文章
    editArticle (e) {
      if (!this.isOwner) return
      this.showEditDialog = true
    },
    // 关闭编辑窗口
    onCloseEditDialog (e) {
      this.saveArticle()
    },
    // 保存修改
    saveArticle () {
      // 提交后台保存
      this.$emit('saveAboutUs', this.info)
      this.showEditDialog = false
    },
    showUploadImage (uploadImageInfo) {
      if (uploadImageInfo.length === 0) { return }

      for (var i = 0; i < uploadImageInfo.length; i++) {
        this.showPics[this.showPics.length] = uploadImageInfo[i].source + '/' + uploadImageInfo[i].fileName
      }
      this.$emit('saveShowImages', JSON.stringify(this.showPics))
    },
    deletePic (index) {
      if (!this.isOwner) return
      Dialog.confirm({
        selector: '#delete-pic-dialog',
        title: '删除图片',
        message: ' ',
        closeOnClickOverlay: true,
        showConfirmButton: true,
        showCancelButton: true
      }).then(() => {
        // on confirm
        this.showPics.splice(index, 1)
        this.$emit('saveShowImages', JSON.stringify(this.showPics))
      }).catch(() => {
        // on cancel
        console.log('取消删除')
      })
    }
  },
  watch: {
    pics (newV, oldV) {
      this.showPics = newV
    }
  },
  props: {
    info: String,
    pics: {
      type: Array,
      default: []
    }
  }
}
</script>

<style lang="less">
.website-index {

  .section {
    display: block;
    margin: 5px 10px;
  }

  .section-title {
    font-size: 12px;
    font-weight: bold;
    margin: 5px 0;
  }

  .section-content {
    font-size: 12px;
  }

  .section-content .empty-msg {
    font-size: 12px;
    margin-top: 40px;
    text-align: center;
  }

  .section-content .edit-msg {
    height: 50px;
    border: 1px dotted #ccc;
    text-align: center;
    font-size: 13px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .section-article {
    margin: 5px;
    text-indent: 10px;
  }

  .edit-about-us .van-popup {
    display: block;
    width: 100%;
    height: 100%;
    backgroud: #fff;
  }

  .edit-about-us .van-popup .article-field {
    height: 100px;
  }

  .edit-about-us .van-popup .articleEditDialog textarea {
    width: 100%;
    height: 100px;
    margin: 5px 10px;
  }

  .section .section-content .pic-list image{
    width: 100%;
  }

  .add-elegant-pic .upload{
    text-align: center;
    line-height: 30px;
    color: #ccc;
  }
  .add-elegant-pic .upload .add-tip{
    color: #F88460;
    font-size: 13px;
  }

}
</style>