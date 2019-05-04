
// 引入coolsite360交互配置设定
require('coolsite.config.js');
var qcloud = require('../../bower_components/wafer-client-sdk/index.js');
var config = require('../../config.js')

// 获取全局应用程序实例对象
var app = getApp();

// 创建页面实例对象
Page({
  /**
   * 页面名称
   */
  name: "showsignuplist",
  /**
   * 页面的初始数据
   */

  data: {
    acId:"",
    signUpList:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:function(param) {
    // 注册coolsite360交互模块
    app.coolsite360.register(this);
    this.setData({
        acId: param.acId
    })
    const self = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
        url: 'your url',
        data:{
            acId:self.data.acId
        },
        success: function (res) {
            var result = res.data;
            var jsonLength = 0;
            console.log("请求成功，获取到的数据为：", result);
            var array = new Array();
            for (var key in result) {
                array[key] = result[key]
            }
            console.log('转换后的数组为：', array);
            self.setData({
                signUpList: array,
            });
            wx.hideLoading();
            wx.showToast({
              title: '加载完成',
              icon:'success',
              duration:1000,
            })
        },
        fail: function (err) {
            console.log("请求失败：", err);
        }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {
    // 执行coolsite360交互组件展示
    app.coolsite360.onShow(this);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
    
  },


  //以下为自定义点击事件
  
  tap_8a585329:function(e){
    //触发coolsite360交互事件
    app.coolsite360.fireEvent(e,this);
  },
  showSignUpInfo:function(event){
      wx.navigateTo({
          url: '../showsignupinfo/showsignupinfo?acId=' + this.data.acId + '&openId=' + event.currentTarget.dataset.openid,
      })
  },
  onPullDownRefresh: function () {
      const self = this;
      wx.request({
          url: 'your url',
          data: {
              acId: self.data.acId
          },
          success: function (res) {
              wx.stopPullDownRefresh()
              var result = res.data;
              var jsonLength = 0;
              console.log("请求成功，获取到的数据为：", result);
              var array = new Array();
              for (var key in result) {
                  array[key] = result[key]
              }
              console.log('转换后的数组为：', array);
              self.setData({
                  signUpList: array,
              });
              wx.showToast({
                  title: '刷新成功',
                  icon:'success'
              })
          },
          fail: function (err) {
              console.log("请求失败：", err);
          }
      })
  }
})

