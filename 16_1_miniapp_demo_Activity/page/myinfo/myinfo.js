
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
  name: "myinfo",
  /**
   * 页面的初始数据
   */

  data: {
    name:"",
    phoneNum:"",
    openId:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:function(param) {
    // 注册coolsite360交互模块
    app.coolsite360.register(this);
    this.setData({
        openId:param.openId
    });
    const self = this;
    wx.request({
        url: 'your url',
        data:{
            openId:self.data.openId
        },
        success:function(res){
            console.log("请求到的数据是：",res.data);
            self.setData({
                name:res.data.name,
                phoneNum:res.data.phoneNum
            });
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
  
  tap_c86c244c:function(e){
    //触发coolsite360交互事件
    app.coolsite360.fireEvent(e,this);
  },
  
  tap_d3326ad6:function(e){
    //触发coolsite360交互事件
    app.coolsite360.fireEvent(e,this);
  },
  checkPhoneNumDirect: function (mobile) {
    var self = this;
    var mobile = mobile;
    console.log("输入的手机号是：", mobile);
    if (mobile.length != 11) {
      wx.showModal({
        title: '手机号码输入错误',
        content: '号码长度必须为11位',
        showCancel: false,
        confirmText: "返回修改",
        success: function (res) {
          if (res.confirm) {
            self.setData({
              phoneNum: ""
            })
          }
        }
      });
      return false;
    } else {
      var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
      if (!myreg.test(mobile)) {
        wx.showModal({
          title: '手机号码输入错误',
          content: '号码格式不正确',
          showCancel: false,
          confirmText: "返回修改",
          success: function (res) {
            if (res.confirm) {
              self.setData({
                phoneNum: ""
              })
            }
          }
        });
        return false;
      }else{
        return true;
      }
    }
  },
  changeMyInfo:function(e){
      const self = this;
      var result = self.checkPhoneNumDirect(e.detail.value.phoneNum);
      if(result){
        wx.request({
          url: 'your url',
          data: {
            openId: self.data.openId,
            name: e.detail.value.name,
            phoneNum: e.detail.value.phoneNum
          },
          success: function (response) {
            if (response.data) {
              console.log('保存成功：', response.data);
              wx.showToast({
                title: '保存成功',
                icon: 'success',
              })
              setTimeout(function () {
                wx.switchTab({
                  url: '/page/me/me'
                })
              }, 1500)
            }
          },
          fail: function (err) {
            console.log('保存失败', err);
          }
        })
      }
  },
  delMyInfo(){
      const self = this;
      wx.showModal({
          title: '提示',
          content: '您确定要删除您的个人信息吗？删除后在下次报名活动时，将不会自动填写相关信息。',
          success:function(res){
              if(res.confirm){
                  wx.request({
                      url: 'your url',
                      data: {
                          openId: self.data.openId,
                          name: "",
                          phoneNum: ""
                      },
                      success: function (response) {
                          if (response.data) {
                              console.log('删除成功：', response.data);
                              wx.showToast({
                                  title: '删除成功',
                                  icon: 'success',
                              })
                              setTimeout(function () {
                                  wx.switchTab({
                                      url: '/page/me/me'
                                  })
                              }, 1500)
                          }
                      },
                      fail: function (err) {
                          console.log('删除失败', err);
                      }
                  })
              }
          }
      })
  },
  checkPhoneNum:function(e){
      var self = this;
      var mobile = e.detail.value;
      console.log("输入的手机号是：",mobile);
      if (mobile.length != 11) {
          wx.showModal({
              title: '手机号码输入错误',
              content: '号码长度必须为11位',
              showCancel:false,
              confirmText:"返回修改",
              success:function(res){
                  if(res.confirm){
                      self.setData({
                          phoneNum:""
                      })
                  }
              }
          })
      }else{
          var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
          if (!myreg.test(mobile)) {
              wx.showModal({
                  title: '手机号码输入错误',
                  content: '号码格式不正确',
                  showCancel: false,
                  confirmText: "返回修改",
                  success: function (res) {
                      if (res.confirm) {
                          self.setData({
                              phoneNum: ""
                          })
                      }
                  }
              })
          }
      }
  }
})
