// pages/orders/addgoods.js
var app = getApp(); 

Page({
  /**
   * 页面的初始数据
   */
  data: {
    colorItems: app.globalData.colorItems,
    
    usages: app.globalData.usages,
    usageIndex: app.globalData.usageIndex,

    sizes: app.globalData.sizes,
    sizeIndex: app.globalData.sizeIndex,
    
    addRoute: "goods/create",
    codehref: "",
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
  }
})