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

    listRoute: "goods/summary",

    colorShow: "block",
    usageShow: "block",
    sizeShow: "block",

    listData: [],
    total: 0,

    page: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fillList({});
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
    console.log('up');
    this.fillList({});
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  fillList: function (formData) {
    var that = this;
    formData.p = that.data.page;
    console.log(formData);
    wx.request({
      method: "GET",
      url: app.globalData.domain + that.data.listRoute,
      data: formData,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        // console.log(res.data);
        if (res.data.success) {
          that.setData({ 
            listData: res.data.data, 
            total: res.data.data.length
            });
        }
        
      }
    });
  },
  onCondClick: function(e) {
    var formData = e.target.dataset;
    var sourceData = this.data.conditionItems;
    sourceData.push(formData);
    this.setData({ conditionItems: sourceData});

    var items = this.data.conditionItems;
    var listFormData = {};
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      listFormData[item.obj] = item.name;
    }
    this.fillList(listFormData);

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

    var items = this.data.conditionItems;
    var listFormData = {};
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      listFormData[item.obj] = item.name;
    }
    this.fillList(listFormData);
    
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