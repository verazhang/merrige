//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
  },
  globalData: {
    userInfo: null,
    colorItems: [
      { name: '肤色', value: '0', checked: true },
      { name: '黑色', value: '1' }
    ],
    usagesfull: ["蚕茧", "科技塑身纤体衣", "能量", "无肩"],
    usages: ["蚕茧", "纤体", "能量", "无肩"],
    usageIndex: 0,

    sizes: ["M", "L", "XL", "2XL", "3XL", "4XL"],
    sizeIndex: 0,
    // domain: "http://192.168.10.10/"
    domain: "http://119.27.163.89:8090/"
  },
  openToast: function (title, duration) {
    wx.showToast({
      title: title ? title : '已完成',
      icon: 'success',
      duration: duration ? duration : 3000
    });
  },
  hideToast: function() {
    wx.hideToast();
  },
  openLoading: function (title) {
    // wx.showLoading({
    //   title: title ? title : '加载中',
    // });
    wx.showToast({
      title: title ? title : '数据加载中',
      icon: 'loading',
      duration: 3000
    });
  },
  hideLoading: function() {
    wx.hideLoading();
  }
})