
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
  name: "showsignupinfo",
  /**
   * 页面的初始数据
   */

  data: {
      openId:"",
      acId:"",
      name:"",
      phoneNum:"",
      others:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:function (param) {
    // 注册coolsite360交互模块
    app.coolsite360.register(this);
    this.setData({
        openId:param.openId,
        acId:param.acId
    });
    const self = this;
    wx.request({
        url: 'your url',
        data: {
            openId: self.data.openId,
            acId: self.data.acId
        },
        success: function (res) {
            self.setData({
                name: res.data.data[0]['content'],
                phoneNum: res.data.data[1]['content'],
                others: res.data.data[2]['content'],
            });
        },
        fail: function (err) {
            console.log("请求错误", err);
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
  delSignUpInfo(){
      const self = this;
      wx.showModal({
          title: '您确定要删除该用户的报名信息吗？',
          content: '如果对方向您支付过活动费用，请您务必在联系对方确认相关费用退还无误后删除该用户。该用户被删除后将不可再报名此活动。',
          success:function(res){
              if(res.confirm){
                  wx.request({
                      url: 'your url',
                      data:{
                          openId:self.data.openId,
                          acId:self.data.acId
                      },
                      success:function(res){
                          if(res.data>0){
                              wx.showToast({
                                  title: '删除成功',
                                  icon:'success',
                                  duration:1500
                              });
                              setTimeout(function(){
                                  wx.navigateBack({
                                      delta:1
                                  })
                              },1500)
                          }
                      }
                  })
              }
          }
      })
  },
  makePhoneCall(){
      wx.makePhoneCall({
          phoneNumber: this.data.phoneNum,
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
      })
  }
})

