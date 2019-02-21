<p align="center">
    <a href="http://mpvue.com/">
        <img width="200" src="http://mpvue.com/assets/logo.png">
    </a>
    <a href="https://youzan.github.io/vant/">
        <img width="200" src="https://img.yzcdn.cn/public_files/2017/12/18/fd78cf6bb5d12e2a119d0576bedfd230.png">
    </a>
</p>

## 简介
本项目为`mpvue`引入`小程序原生组件`示例程序，通过`webpack-plugin`的方式将`vant`文件夹下组件引用到`dist`，插件地址：[`import-weapp-component`](https://github.com/JJJYY/import-weapp-component)

## 缺陷
若原生组件通过`click`事件，即`this.triggerEvent('click', { index })`来进行父子组件通信，`mpvue`无法从`event.mp`中读取到正确的`detail`，原因是因为`mpvue`将`click`事件编译为`tap`导致`this.triggerEvent('click', { index })`无法找到`click`句柄

## 解决方案
修改组件库`click`事件名称，例如：

`this.triggerEvent('click', { index })` => `this.triggerEvent('iclick', { index })`

对应的模板中：

`@click` => `@iclick`

> 注：本次示例中修改了`modal`组件

## 受影响组件(仅传值情况受影响)
1. action-sheet
2. modal

## 示例代码
关于示例部分代码通过脚本生成的基础上进行的修改，没有注意格式，仅供参考

## License
[MIT](http://opensource.org/licenses/MIT)

## flyio [文档](https://wendux.github.io/dist/#/doc/flyio/compare)

## mpvue 小程序生命周期

[参考地址](http://imweb.io/topic/5b8f42127cd95ea863193599)

`mpvue中，Vue和小程序生命周期钩子触发的基本顺序是beforeCreate -> created -> onLaunch/onLoad -> onShow -> onReady -> beforeMount -> mounted -> ...`

#### 小程序页面跳转方式：
```$xslt
wx.navigateTo({
    url:'../test/test?id=1&page=4',  //跳转页面的路径，可带参数 ？隔开，不同参数用 & 分隔；相对路径，不需要.wxml后缀
    success:function(){}        //成功后的回调；
    fail：function(){}          //失败后的回调；
    complete：function(){}      //结束后的回调(成功，失败都会执行)
})

传递的参数在接收页面onLoad()函数中得到值：option.id就可以得到了
onLoad: function (option) {
　　console.log(option)//可以打印一下option看查看参数
    this.setData({
        id:option.id,
    });
}   
 
wx.redirectTo() , 关闭当前页面，跳转到非tabBar的某个页面，

wx.switchTab ，跳转到tabBar的某个页面
wx.switchTab({
  url: '../taste/index',   //注意switchTab只能跳转到带有tab的页面，不能跳转到不带tab的页面
})
```
