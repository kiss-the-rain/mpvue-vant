<script>
export default {
  created () {
    // 调用API从本地缓存中获取数据
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    console.log('app created and cache logs by setStorageSync')
  }
}
</script>

<style>
page{
    height: 100%;
    width: 100%;
    font-size: 14px;
}
.no-bg-page{
  width: 100%;
  height: 100%;
  font-family: '微软雅黑';
  color: #555;
  font-size: 14px;
}
.container{
  flex-wrap: wrap;
  background: #efeff4;
  font-family: '微软雅黑';
  color: #555;
  font-size: 14px;
}
.page{
  background: #efeff4;
  font-family: '微软雅黑';
  color: #555;
  font-size: 14px;
}
.placeholder{
  font-size: 14px;
  color: #999;
}
.blank-line {
  width: 365px;
  height: 5px;
  margin: 0 5px;
  background-color:#efeff4;
  margin:0 5px;
}

/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
