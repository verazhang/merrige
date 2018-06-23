// pages/orders/order.js
var app = getApp();

Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    showTopTips: false,

    payments: [
      {"en": "weixin", "cn": "微信"}, 
      {"en": "zhifubao", "cn": "支付宝"}, 
      {"en": "cash", "cn": "现金"}, 
      {"en": "other", "cn": "其他"}
    ],
    paymentIndex: 0,

    colorItems: app.globalData.colorItems,

    usages: app.globalData.usages,
    usageIndex: app.globalData.usageIndex,

    sizes: app.globalData.sizes,
    sizeIndex: app.globalData.sizeIndex,

    addRoute: "order/create",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var that = this;
    var colorConf = that.data.colorItems;
    if (options) {
      switch (options.color) {
        case "肤色":
          colorConf[0]["checked"] = true;
          colorConf[1]["checked"] = false;
          that.setData({ colorItems: colorConf});
        break;
        case "黑色":
          colorConf[0]["checked"] = false;
          colorConf[1]["checked"] = true;
          that.setData({ colorItems: colorConf });
        break;
      }
      if (options.usage) {
        var usageConf = that.data.usages;
        for (var i = 0; i < usageConf.length; i++) {
          if (usageConf[i] == options.usage) {
            that.setData({usageIndex: i});
            break;
          }
        }
      }

      if (options.size) {
        var sizeConf = that.data.sizes;
        for (var i = 0; i < sizeConf.length; i++) {
          if (sizeConf[i] == options.size) {
            that.setData({ sizeIndex: i });
            break;
          }
        }
      }
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  bindPaymentChange: function (e) {
    console.log('picker account 发生选择改变，携带值为', e.detail.value);

    this.setData({
      paymentIndex: e.detail.value
    })
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);

    var radioItems = this.data.colorItems;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
      radioItems[i].checked = radioItems[i].value == e.detail.value;
    }

    this.setData({
      colorItems: radioItems
    });
  },
  bindUsageChange: function (e) {
    console.log('picker account 发生选择改变，携带值为', e.detail.value);

    this.setData({
      usageIndex: e.detail.value
    })
  },
  bindSizeChange: function (e) {
    console.log('picker account 发生选择改变，携带值为', e.detail.value);

    this.setData({
      sizeIndex: e.detail.value
    })
  },
  showTopTips: function () {
    var that = this;
    this.setData({
      showTopTips: true
    });
    setTimeout(function () {
      that.setData({
        showTopTips: false
      });
    }, 3000);
  },
  formSubmit: function (e) {
    // var that = this;
    var formData = e.detail.value; 
    formData.detail = { "color": formData.color, "usage": formData.usage, "size": formData.size};
    //console.log(formData);
    wx.request({
      method: "POST",
      url: app.globalData.domain + this.data.addRoute, //仅为示例，并非真实的接口地址
      data: formData,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
      }
    });
  }
})