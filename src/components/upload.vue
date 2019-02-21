<template>
  <div v-if="!hideButton" class="upload" @click="addImage">
    <slot name="icon">
      <image class="add-img" src="../../static/images/add_icon.png"></image>
    </slot>
  </div>
</template>

<script>
import httpFlyio from '../utils/httpFlyio'
import wxFuns from '../utils/wxFuns'
import $store from '../store/index'

export default {
  name: 'imageUpload',
  components: {},
  data () {
    return {}
  },
  methods: {
    async addImage (e) {
      // 判断是否禁用
      if (this.disable) {
        return
      }

      await this.chooseAndUpload()
    },
    // 图片选择和循环上传
    async chooseAndUpload () {
      // 弹出菜单列表tapIndex为列表顺序，从上到下，从0开始
      const action = await wxFuns.showActionSheet({
        itemList: ['从相册中选择', '拍照'],
        itemColor: '#f7982a'
      })
      let type = ''
      if (!action.cancel) {
        if (action.tapIndex === 0) {
          type = 'album'
        } else if (action.tapIndex === 1) {
          type = 'camera'
        }
      }
      const imageInfo = await wxFuns.chooseImage(
        this.count,
        ['original', 'compressed'],
        [type]
      )

      const addImg = imageInfo.tempFilePaths
      const addLen = addImg.length
      // 最多上传三张照片
      if (addLen > this.count) {
        await wxFuns.showModal({
          title: '警告',
          content: `最多上传 ${this.count} 张图片`,
          showCancel: false
        })
        return
      }

      let uploadImageInfos = []
      const pathsCount = imageInfo.tempFilePaths.length

      // 弹出一个遮罩层，上传完成前禁止用户其他操作
      await wxFuns.showToast({
        title: '上传中...',
        icon: 'loading',
        mask: true,
        duration: 30000
      })

      for (let i = 0; i < pathsCount; i++) {
        // 将内存中的tempFilePath文件上传到服务器
        let uploadImageInfo
        try {
          uploadImageInfo = await this.upload(imageInfo.tempFilePaths[i])
        } catch (e) {
          console.log('上传失败', e.message)
        }
        if (!uploadImageInfo) {
          await wxFuns.showToast({
            title: '上传失败',
            icon: 'none'
          })
          break
        }
        uploadImageInfos.push(uploadImageInfo)
      }
      await wxFuns.hideToast()
      this.$emit('afterUpload', uploadImageInfos)
    },
    // 单张图片上传
    upload: async function (path) {
      // 获取图片上传 token, source: 类型
      // TODO 批量，大小校验
      // 获取图片详细信息
      const imageItemInfo = await wxFuns.getImageInfo(path)
      console.log(imageItemInfo)
      const uploadTokenInfo = {}
      const uploadImageInfo = {}
      const ossKeyRes = await httpFlyio.post('/api/mnp/1/get_oss_key_info', {
        source: this.source,
        fileSuffix: imageItemInfo.type
      })

      if (ossKeyRes.ret !== 0) {
        throw new Error('获取 token 失败')
      }

      const data = JSON.parse(ossKeyRes.data)
      uploadTokenInfo.success_action_status = 200
      uploadTokenInfo.OSSAccessKeyId = data.accessid
      uploadTokenInfo.policy = data.policy
      uploadTokenInfo.signature = data.signature
      uploadTokenInfo.expire = data.expire
      uploadTokenInfo.callback = data.callback
      uploadTokenInfo.dir = data.dir
      // 调用wx官方文件上传API
      uploadTokenInfo.key = uploadTokenInfo.dir + data.fileKey
      // userId 可能是 OSS 系统关键字，这里和后台约定改为小写
      // console.log(`upload.vue-$store.user.userId = ${$store.state.user.userId}`)
      uploadTokenInfo['x:userid'] = $store.state.user.userId
      uploadTokenInfo['x:source'] = this.source
      uploadTokenInfo['x:filekey'] = data.fileKey
      uploadImageInfo.path = path
      const resultUploadFile = await wxFuns.uploadFile({
        url: data.host, // 上传地址
        filePath: path,
        name: 'file',
        formData: uploadTokenInfo,
        header: {
          'Content-Type': 'multipart/form-data'
        }
      })

      console.log(resultUploadFile)
      const uploadRes = resultUploadFile && resultUploadFile.statusCode === 200 ? JSON.parse(resultUploadFile.data) : null
      if (!uploadRes || uploadRes.ret !== 0) {
        throw new Error('上传失败')
      }

      uploadImageInfo.url = data.host + '/' + uploadRes.data.source + '/' + uploadRes.data.fileName
      uploadImageInfo.fileKey = uploadRes.data.fileKey
      uploadImageInfo.fileName = uploadRes.data.fileName
      uploadImageInfo.source = uploadRes.data.source
      return uploadImageInfo
    }
  },
  props: {
    // 是否禁用
    disable: {
      type: Boolean,
      default: false
    },
    // 允许上传的图片数量
    count: {
      type: Number,
      default: 5
    },
    // 图片所属来源
    source: {
      type: String,
      default: 'bcardimage'
    },
    // 是否隐藏上传按钮
    hideButton: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style>
  .upload {
    width: 355px;
    height: 80px;
    border: 1px dashed #555;
    border-radius: 5px;
  }
  .add-img {
    width: 70px;
    height: 70px;
    position: relative;
    top: 5px;
    left: 143px;
  }
</style>
