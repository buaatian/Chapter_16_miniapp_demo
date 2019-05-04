// alterInfo.js
var app = getApp()
const urlUser = 'https://driftingbooks.xyz/users/';
const loginKey = 'loginKey';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    pwd: '',
    repwd: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var user = wx.getStorageSync(loginKey);
    this.setData({
      userInfo: user
    })
  },

  onShareAppMessage: function () {

  },
  saveName: function (e) {
    this.setData({ 'userInfo.userName': e.detail.value })
  },
  saveAge: function (e) {
    this.setData({ 'userInfo.age': e.detail.value })
  },
  saveCity: function (e) {
    this.setData({ 'userInfo.city': e.detail.value })
  },
  saveSex: function (e) {
    this.setData({ 'userInfo.sex': e.detail.value })
  },
  savePwd: function (e) {
    this.setData({ 'pwd': e.detail.value })
  },
  saveRePwd: function (e) {
    this.setData({ 'repwd': e.detail.value });
    if (this.data.pwd != this.data.repwd) {
      wx.showModal({
        title: '两次密码不一致',
        content: '',
        showCancel: false,
      });
    }
  },
  saveChange: function () {
    if (this.data.pwd.length < 6 && this.data.pwd.length!=0) {
      wx.showModal({
        title: '密码长度不少于6字符',
        content: '',
        showCancel: false,
      });
      return;
    }
    if (this.data.pwd == this.data.repwd) {
      var user = this.data.userInfo;
      if (this.data.pwd != '') {
        this.setData({ 'userInfo.password': this.data.pwd });
      }
      console.log('用户:' + user.userId);
      wx.request({
        url: urlUser + user.userId,
        data: {
          password: user.password,
          userName: user.userName,
          age: user.age,
          city: user.city,
          sex: user.sex,
        },
        method: 'PUT',
        success: function (res) {
          if (res.data == 0) {
            wx.setStorage({
              key: loginKey,
              data: user
            });
            wx.showModal({
              title: '修改成功',
              content: '',
              showCancel: false,
              complete: function (res) { wx.navigateBack({}) },
            });
          } else {
            wx.showModal({
              title: '修改失败',
              content: '',
              showCancel: false,
            })
            return;
          }
        },
        fail: function (res) {
          wx.showModal({
            title: '修改失败',
            content: '',
            showCancel: false,
          })
        },
        complete: function (res) { },
      })
    } else {
      wx.showModal({
        title: '两次密码不一致',
        content: '',
        showCancel: false,
      })
    }
  }
})