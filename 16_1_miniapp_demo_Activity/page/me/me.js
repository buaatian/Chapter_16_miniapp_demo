
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
  name: "me",
  /**
   * 页面的初始数据
   */

  data: {
      openId:"",
      avatarUrl:"",
      nickName:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    // 注册coolsite360交互模块
    app.coolsite360.register(this);
    const self = this;
    qcloud.setLoginUrl(config.service.loginUrl);
    wx.showLoading({
      title: '正在加载',
      mask:true,
    })
    qcloud.request({
        login:true,
        url: config.service.requestUrl,
        success:function(res){
            self.setData({
                openId:res.data.data.userInfo.openId,
                avatarUrl: res.data.data.userInfo.avatarUrl,
                nickName: res.data.data.userInfo.nickName
            });
            wx.hideLoading();
        },
        fail:function(err){
          wx.hideLoading();
          wx.showToast({
            title: '登录失败',
            icon: 'loading',
            duration: 2000,
            mask:true,
          })
            console.log("登录失败",err);
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
  
  tap_7086fd7b:function(e){
    //触发coolsite360交互事件
    app.coolsite360.fireEvent(e,this);
  },
  
  tap_2a2bfd41:function(e){
    //触发coolsite360交互事件
    app.coolsite360.fireEvent(e,this);
  },
  
  tap_9288a821:function(e){
    //触发coolsite360交互事件
    app.coolsite360.fireEvent(e,this);
  },
  myInfo(){
      wx.navigateTo({
          url: '../myinfo/myinfo?openId='+this.data.openId,
      })
  }
})

