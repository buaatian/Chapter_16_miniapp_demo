// message.js
var app = getApp()
const urlMessages = 'https://driftingbooks.xyz/messages/';
const loginKey = 'loginKey';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    news:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var user = wx.getStorageSync(loginKey);
    wx.request({
      url: urlMessages + user.userId+'/info',
      method: 'GET',
      success: function(res) {
        that.setData({ news:res.data});
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  refuse:function(e){
    var that=this;
    var user = wx.getStorageSync(loginKey);
    var val = e.currentTarget.dataset;
    var list = that.data.news;
    var data = list[val.index];
    wx.request({
      url: urlMessages,
      data: {
        hid: data.userId, pid: user.userId, doubanId: data.doubanId, bName: data.bName, status: 0
      },
      method: 'DELETE',
      success: function(res) {
        list.splice(val.index, 1);
        that.setData({ news: list });
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  accept:function(e){
    var that = this;
    var user = wx.getStorageSync(loginKey);
    var val = e.currentTarget.dataset;
    var list = that.data.news;
    var data = list[val.index];
    wx.request({
      url: 'https://driftingbooks.xyz/favorites',
      data: {
        userId: user.userId,
        doubanId: data.doubanId,
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      "Content-Type": "application/json",
    })
    wx.request({
      url: 'https://driftingbooks.xyz/notes',
      data: {
        userId: user.userId,
        doubanId: data.doubanId,
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      "Content-Type": "application/json",
    })
    wx.request({
      url: urlMessages,
      data: {
        hid: data.userId, pid: user.userId, doubanId: data.doubanId, bName: data.bName, status: 0
      },
      method: 'DELETE',
      success: function (res) {
        list.splice(val.index, 1);
        that.setData({ news: list });
      },
      fail: function (res) { },
      complete: function (res) { },
    })
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
  
  }
})