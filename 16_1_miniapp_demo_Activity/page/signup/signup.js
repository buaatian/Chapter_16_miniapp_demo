
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
  name: "signup",
  /**
   * 页面的初始数据
   */

  data: {
      id:"",
      fee:"",
      name:"",
      phoneNum:"",
      others:"",
      openId:"",
      exist:"",
      imageSrc:"",
      feePicId:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:function(param) {
    // 注册coolsite360交互模块
    app.coolsite360.register(this);
    this.setData({
        fee:param.fee,
        id:param.id,
        openId:param.openId,
    });
    if(param.fee > 0){
        this.setData({
            feePicId:param.feePicId
        })
        wx.downloadFile({
            url:'your url'+param.feePicId,
            success: function (res) {
                self.setData({
                    imageSrc: res.tempFilePath,
                })
            }
        })
    }
     console.log(this.data.fee,this.data.id,this.data.openId,this.data.feePicId)
     const self = this;
     wx.request({
         url: 'your url',
         data:{
             openId:self.data.openId
         },
         success:function(res){
             if(res.data.name && res.data.phoneNum){
                 self.setData({
                     exist:true,
                     name:res.data.name,
                     phoneNum:res.data.phoneNum
                 })
             }else{
                 self.setData({
                     exist:false
                 })
             }
         },
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
  checkSignInfo(e){
      var response = new Object();
      var name = e.name;
      var phoneNum = e.phoneNum;
      if(!name){
          response.status = false;
          response.data = "请填写真实姓名";
          return response;
      }else if(!phoneNum){
          response.status = false;
          response.data = "请填写手机号码";
          return response;
      }else{
          response.status = true;
          response.data = "可正常报名";
          return response;
      }
  },
  checkUserInfo(name,phoneNum,openId,self){
      if (self.data.exist) {
          if (name !== self.data.name || phoneNum !== self.data.phoneNum) {
              wx.showModal({
                  title: '提示',
                  content: '您填写的信息和您之前保存的个人信息不一致，是否更新您的个人信息？',
                  cancelText: '不更新',
                  confirmText: '保存更新',
                  success: function (res) {
                      if (res.confirm) {
                          wx.request({
                              url: 'your url',
                              data: {
                                  openId: openId,
                                  name: name,
                                  phoneNum: phoneNum
                              },
                              success: function (response) {
                                  if (response.data) {
                                      console.log('更新成功：', response.data);
                                      wx.showToast({
                                          title: '更新成功',
                                          icon: 'success',
                                      })
                                      setTimeout(function () {
                                          wx.switchTab({
                                              url: '/page/index/index'
                                          })
                                      },1500)
                                  }
                              },
                              fail: function (err) {
                                  console.log('更新失败', err);
                              }
                          })
                      } else if (res.cancel) {
                          console.log('用户点击取消')
                          wx.switchTab({
                              url: '/page/index/index'
                          })
                      }
                  }
              })
          }else{
              wx.switchTab({
                  url: '/page/index/index'
              })
          }
      } else {
          wx.showModal({
              title: '提示',
              content: '是否保存您的信息以便下次自动填写？',
              cancelText: '不保存',
              confirmText: '保存',
              success: function (res) {
                  if (res.confirm) {
                      wx.request({
                          url: 'your url',
                          data: {
                              openId: openId,
                              name: name,
                              phoneNum: phoneNum
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
                                          url: '/page/index/index'
                                      })
                                  }, 1500)
                              }
                          },
                          fail: function (err) {
                              console.log('保存失败', err);
                          }
                      })
                  } else if (res.cancel) {
                      console.log('用户点击取消')
                      wx.switchTab({
                          url: '/page/index/index'
                      })
                  }
              }
          })
      }
  },
  signUpSubmit:function(e){
      const self = this;
      var resutl = self.checkSignInfo(e.detail.value);
      if (!resutl.status){
          wx.showModal({
              title: '出现错误',
              content: resutl.data,
              showCancel:false
          })
      }else{
          wx.request({
              url: 'your url',
              data: {
                  openId: self.data.openId,
                  acId: self.data.id,
                  name: e.detail.value.name,
                  phoneNum: e.detail.value.phoneNum,
                  others: e.detail.value.others
              },
              success:function(res){
                  if(res.data){
                      console.log("报名成功：",res.data);
                      wx.showToast({
                          title: '报名成功',
                          icon:'success'
                      })
                      setTimeout(function () {
                          self.checkUserInfo(e.detail.value.name, e.detail.value.phoneNum, self.data.openId, self)
                      }, 1500)
                  }else{
                      console.log("报名失败：", res.data);
                  }
              },
              fail:function(err){
                  console.log("请求失败", err);
              }
          })
      }
  },
  saveImage(){
      wx.saveImageToPhotosAlbum({
          filePath:this.data.imageSrc,
          success:function(res){
              wx.showToast({
                  title: '保存成功',
              })
          }
      })
  }
})

