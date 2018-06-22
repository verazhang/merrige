// pages/product/list.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    colorItems: app.globalData.colorItems,
    usages: app.globalData.usages,
    sizes: app.globalData.sizes,

    conditionItems: [],

    listRoute: "goods/list",

    colorShow: "block",
    usageShow: "block",
    sizeShow: "block",

    listData: [{color:"black", usage:"xianti",size:"3XL",total:2}],
    total: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.fillList("");
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
  fillList: function (formData) {
    wx.request({
      method: "GET",
      url: app.globalData.domain + this.data.listRoute,
      data: formData,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data);
        if (res.data.success) {
          this.setData({listData: res.data.data});
        }
        
      }
    });
  },
  onCondClick: function(e) {
    var formData = e.target.dataset;
    var sourceData = this.data.conditionItems;
    sourceData.push(formData);
    this.setData({ conditionItems: sourceData});
    
    switch (formData.obj) {
      case "color":
        this.setData({colorShow: "none"});
      break;
      case "usage":
        this.setData({ usageShow: "none" });
      break;
      case "size":
        this.setData({ sizeShow: "none" });
      break;
    }
  },
  onCondDelete: function(e) {
    var formData = e.target.dataset;
    var delObj = formData.obj;
    var sourceData = this.data.conditionItems;
    for (var i = 0; i < sourceData.length; i++) {
      if (sourceData[i]["obj"] == delObj) {
        sourceData.splice(i, 1);
        break;
      }
    }
    this.setData({ conditionItems: sourceData });

    switch (delObj) {
      case "color":
        this.setData({ colorShow: "block" });
        break;
      case "usage":
        this.setData({ usageShow: "block" });
        break;
      case "size":
        this.setData({ sizeShow: "block" });
        break;
    }
  }
})