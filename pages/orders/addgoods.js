// pages/orders/addgoods.js
var app = getApp(); 

Page({
  /**
   * 页面的初始数据
   */
  data: {
    colorItems: app.globalData.colorItems,
    
    usagesfull: ["蚕茧", "科技塑身纤体衣", "能量", "无肩"],
    usages: app.globalData.usages,
    usageIndex: app.globalData.usageIndex,

    sizes: app.globalData.sizes,
    sizeIndex: app.globalData.sizeIndex,
    
    addRoute: "goods/create",
    codehref: "",
    uploadRoute: "goods/upload",
    getucsRoute: "goods/getucs"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
  formSubmit: function (e) {
    var formData = e.detail.value; 
    console.log(formData);
    wx.request({
      method: "POST",
      url: app.globalData.domain + this.data.addRoute,
      data: formData,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
      }
    });
  },
  scanCode: function() {
    // 允许从相机和相册扫码
    wx.scanCode({
      success: (res) => {
        console.log(res);
        this.setData({
          codehref: res.result
        });
      }
    });
  },
  chooseImage: function() {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        console.log(res);
        wx.uploadFile({
          url: app.globalData.domain + that.data.uploadRoute,
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'user': 'test'
          },
          success: function (res) {
            var data = res.data;
            console.log(res);
            wx.request({
              method: "GET",
              url: app.globalData.domain + that.data.getucsRoute,
              data: { name: data},
              header: {
                'content-type': 'application/json'
              },
              success: function (res) {
                console.log(res.data);
                that.initForm(res.data.data);
              }
            });
          }
        })
      }
    })
  },
  initForm: function (options) {
    var that = this;
    var colorConf = that.data.colorItems;
    if (options) {
      switch (options.color) {
        case "凝脂肤色":
          colorConf[0]["checked"] = true;
          colorConf[1]["checked"] = false;
          that.setData({ colorItems: colorConf });
          break;
        case "黑色":
          colorConf[0]["checked"] = false;
          colorConf[1]["checked"] = true;
          that.setData({ colorItems: colorConf });
          break;
      }
      if (options.usage) {
        var usageConf = that.data.usagesfull;
        for (var i = 0; i < usageConf.length; i++) {
          if (usageConf[i] == options.usage) {
            that.setData({ usageIndex: i });
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
  }
})