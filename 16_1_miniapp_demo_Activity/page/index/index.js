
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
  name: "index",
  /**
   * 页面的初始数据
   */

  data: {
      acList:"",
      nowUser:"",
      exist:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    // 注册coolsite360交互模块
    app.coolsite360.register(this);
    const self = this;
    qcloud.setLoginUrl(config.service.loginUrl);
    // qcloud.login({
    //   success: function (userInfo) {
    //     self.setData({
    //       nowUser:userInfo.openId
    //     })
    //     console.log('登录成功', userInfo);
    //   },
    //   fail: function (err) {
    //     console.log('登录失败', err);
    //   }
    // });
    wx.showLoading({
      title: '正在登录',
      mask:true,
    })
    qcloud.request({
        login:true,
        url: 'your url',
        success:function(res){
            var result = res.data;
            var jsonLength = 0;
            console.log("请求成功，获取到的数据为：",result);
            var array = new Array();
            for (var key in result){
                array[key] = result[key]
            }
            console.log('转换后的数组为：',array);
            console.log('当前登录的用户是：', array['nowUser']);
            self.setData({
                acList: array,
                nowUser: array['nowUser']
            });
            wx.hideLoading();
            wx.showToast({
              title: '登录成功',
              icon:'success',
              duration:1000
            })
        },
        fail:function(err){
          wx.hideLoading();
          wx.showToast({
            title: '登录失败',
            icon: 'loading',
            duration: 2000,
            mask:true,
          })
          console.log("请求失败：",err);
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
  
  tap_fe68ff07:function(e){
    //触发coolsite360交互事件
    app.coolsite360.fireEvent(e,this);
  },
  
  tap_26641a03:function(e){
    //触发coolsite360交互事件
    app.coolsite360.fireEvent(e,this);
  },
  
  tap_a2fd29ce:function(e){
    //触发coolsite360交互事件
    app.coolsite360.fireEvent(e,this);
  },
  showLocation:function(event){
    console.log("latitude:", event.currentTarget.dataset.latitude);
    console.log("longitude:", event.currentTarget.dataset.longitude);    
    wx.openLocation({
      latitude: parseFloat(event.currentTarget.dataset.latitude),
      longitude: parseFloat(event.currentTarget.dataset.longitude),
        success:function(res){
            console.log("打开成功",res);
        }
    })
  },
  showMySignUpInfo:function(event){
      wx.navigateTo({
          url: '../showmysignupinfo/showmysignupinfo?acId=' + event.currentTarget.dataset.acid + '&openId=' + this.data.nowUser + '&fee=' + event.currentTarget.dataset.fee + '&feePicId=' + event.currentTarget.dataset.feepicid + '&creatorName=' + event.currentTarget.dataset.creatorname + '&phoneNum=' + event.currentTarget.dataset.phonenum,
      })
  },
  onPullDownRefresh: function () {
      const self = this;
      qcloud.request({
          login: true,
          url: 'your url',
          success: function (res) {
              var result = res.data;
              console.log("请求成功，获取到的数据为：", result);
              var array = new Array();
              for (var key in result) {
                  array[key] = result[key]
              }
              console.log('转换后的数组为：', array);
              console.log('当前登录的用户是：', array['nowUser']);
              self.setData({
                  acList: array,
                  nowUser: array['nowUser']
              });
              wx.stopPullDownRefresh();
              wx.showToast({
                  title: '刷新成功',
                  icon:'success'
              })
          },
          fail: function (err) {
              console.log("请求失败：", err);
          }
      })
  },
  makePhoneCall:function(event){
      wx.makePhoneCall({
          phoneNumber: event.currentTarget.dataset.phonenum,
          success: function(res) {},
          fail: function(res) {},
          complete: function(res) {},
      })
  },
  addNewActivity(){
      const self = this;
      wx.showLoading({
          title: '请稍等',
      })
      wx.request({
          url: 'your url',
          data: {
              openId: self.data.nowUser
          },
          success: function (res) {
              wx.hideLoading();
              if (res.data.name && res.data.phoneNum) {
                  self.setData({
                      exist: true,
                  });
                  wx.navigateTo({
                      url: '../newactivity/newactivity',
                  })
              } else {
                  self.setData({
                      exist: false
                  });
                  wx.showModal({
                      title: '您还没有填写过个人信息',
                      content: '填写个人正确的联系方式，有助于他人报名活动有问题时联系您。',
                      showCancel:false,
                      confirmText:'前往填写',
                      success:function(res){
                          if(res.confirm){
                              wx.navigateTo({
                                  url: '../myinfo/myinfo?openId='+self.data.nowUser,
                              })
                          }
                      }
                  })
              }
          },
      })
  }
})

