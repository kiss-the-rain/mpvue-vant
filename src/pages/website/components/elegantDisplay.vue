<template>
  <div>
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
</template>

<script>
import imageUpload from '@/components/upload'
import Dialog from '@/../static/vant/dialog/dialog'
export default {
  components: {
    imageUpload,
    Dialog
  },
  name: 'elegantDisplay',
  data () {
    return {
      imageBaseUrl: process.env.OSS_BASE_URL,
      isOwner: false, // 是否拥有编辑的权限，有编辑的权限长按可以出发编辑界面
      showPics: []
    }
  },
  created () {
    // 判断当前用户是否为团队管理员
    if (this.$store.state.user.currentTeam) {
      this.isOwner = this.$store.state.user.currentTeam.managerId === this.$store.state.user.userId
    }
  },
  onLoad () {
    this.showPics = this.pics
  },
  methods: {
    showUploadImage (uploadImageInfo) {
      if (uploadImageInfo.length === 0) { return }

      for (var i = 0; i < uploadImageInfo.length; i++) {
        this.showPics[this.showPics.length] = uploadImageInfo[i].source + '/' + uploadImageInfo[i].fileName
      }
      this.$emit('save', JSON.stringify(this.showPics))
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
        this.$emit('save', JSON.stringify(this.showPics))
      }).catch(() => {
        // on cancel
        console.log('取消删除')
      })
    }
  },
  props: {
    pics: {
      type: Array,
      default: []
    }
  }
}
</script>

<style>
  .section-title{
    font-size: 12px;
    font-weight: bold;
    margin: 5px 0;
  }
  .section-content{
      font-size: 12px;
  }
  .section-content .empty-msg{
    font-size: 12px;
    margin-top: 40px;
    text-align: center;
    margin-bottom: 20px;
  }
  .section-content .edit-msg{
    height: 50px;
    border: 1px dotted #ccc;
    text-align: center;
    font-size: 13px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .content .section .section-content .pic-list image{
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

</style>
