<template>
  <div class="page" @touchstart="handlerHideTools">
    <navBar title="发表动态" showBack="true"></navBar>
    <div class="header" >
        <van-field
            :value="content"
            type="textarea"
            autosize
            placeholder="说点什么吧..."
        />
    </div>
    <div class="image-group">
      <div class="image-div">
        <image class="show-image" :src="logoUrl"></image>
      </div>

      <imageUpload @afterUpload="showUploadImage">
        <div slot="icon">
          <image class="add-image" src="../../../static/images/add_icon.png"></image>
        </div>
      </imageUpload>

    </div>
  </div>
</template>

<script>
import imageUpload from '@/components/upload'
import navBar from '@/components/navBar'
export default {
  components: {
    imageUpload,
    navBar
  },
  data () {
    return {
      logoUrl: 'https://objie.oss-cn-shenzhen.aliyuncs.com/timeline.jpg',
      content: '',
      images: [],
      uploadImageInfo: []
    }
  },
  methods: {
    showUploadImage (uploadImageInfo) {
      this.uploadImageInfo = this.uploadImageInfo.concat(uploadImageInfo)
    }
  }
}
</script>

<style lang="less">
  .page{
    background: #fff;

    .header {
      max-height: 300px;
      overflow: auto;
      border-top: 1px solid #eee;
      border-bottom: 1px solid #eee;
    }

    .image-group {
      padding: 10px;

      .image-div {
        width: 90px;
        height: 90px;
        text-align:center;
        float: left;
        margin: 5px;

        .show-image {
          width: 100%;
          height: 100%;
          border-radius: 5px;
        }
      }

      .upload {
        width: 90px;
        height: 90px;
        background-color: #eee;
        text-align:center;
        float: left;
        margin: 5px;
        border: none;

        .add-image {
          margin-top: 20px;
          width: 50px;
          height: 50px;
        }
      }
    }

  }

</style>
