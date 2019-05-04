
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
  name: "showmysignupinfo",
  /**
   * 页面的初始数据
   */

  data: {
    acId:"",
    openId:"",
    name:"",
    phoneNum:"",
    status:"",
    others:"",
    fee:"",
    imageSrc: "",
    feePicId: "",
    creatorName:"",
    creatorPhoneNum:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:function(param) {
    // 注册coolsite360交互模块
    app.coolsite360.register(this);
    this.setData({
        acId:param.acId,
        openId:param.openId,
        fee: param.fee,
        creatorName:param.creatorName,
        creatorPhoneNum:param.phoneNum,
    });
    if (param.fee > 0) {
        this.setData({
            feePicId: param.feePicId
        })
        wx.downloadFile({
            url: 'your url' + param.feePicId,
            success: function (res) {
                self.setData({
                    imageSrc: res.tempFilePath,
                })
            }
        })
    }
    console.log(this.data.acId,this.data.openId);
    const self = this;
    wx.request({
        url: 'your url',
        data:{
            openId:self.data.openId,
            acId:self.data.acId
        },
        success:function(res){
            self.setData({
                name: res.data.data[0]['content'],
                phoneNum: res.data.data[1]['content'],
                others: res.data.data[2]['content'],
                status:res.data.status
            });
            console.log("当前活动的报名状态",res.data.status);
        },
        fail:function(err){
            console.log("请求错误",err);
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
      if (this.data.status == 0) {
          const self = this;
          wx.request({
              url: 'your url',
              data: {
                  openId: self.data.openId,
                  acId: self.data.acId
              },
              success: function (res) {
                  if (res.data) {
                      console.log('更新字段成功', res.data);
                  } else {
                      console.log('更新字段失败', res.data);
                  }
              },
              fail: function (err) {
                  console.log("请求失败：", err);
              }
          })
      }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
    
  },


  //以下为自定义点击事件
  deleteSignUpInfo:function(event){
      const self = this;
      wx.showModal({
          title: '提示',
          content: '您确定要取消本次活动报名吗？如您有过付款，请务必联系活动发起人退回缴纳的活动报名费用！',
          success: function (res) {
              if (res.confirm) {
                  var openId = self.data.openId;
                  var acId = event.currentTarget.dataset.acid;
                  wx.request({
                      url: 'your url',
                      data:{
                          openId:openId,
                          acId:acId
                      },
                      success:function(res){
                          if(res.data){
                              wx.showToast({
                                  title: '取消报名成功',
                                  icon:'success'
                              })
                              setTimeout(function () {
                                  wx.navigateBack({
                                      delta:1
                                  })
                              }, 1500)
                          }else{
                              console.log(res.data);
                              wx.showLoading({
                                  title: '您还没有报名过该活动',
                              });
                              setTimeout(function () {
                                  wx.hideLoading();
                              }, 1500)
                          }
                      },
                      fail:function(err){
                          console.log("请求失败",err);
                      }
                  })
              } else if (res.cancel) {
                  console.log('用户点击取消')
              }
          }
      })
  },
  saveImage() {
      wx.saveImageToPhotosAlbum({
          filePath: this.data.imageSrc,
          success: function (res) {
              wx.showToast({
                  title: '保存成功',
              })
          }
      })
  },
  makePhoneCall(){
      wx.makePhoneCall({
          phoneNumber: this.data.creatorPhoneNum,
      })
  }
})

