
// 引入coolsite360交互配置设定
require('coolsite.config.js');

var qcloud = require('../../bower_components/wafer-client-sdk/index.js');
var config = require('../../config.js')
const util = require('../../util.js')

// 获取全局应用程序实例对象
var app = getApp();

// 创建页面实例对象
Page({
  /**
   * 页面名称
   */
  name: "shareactivity",
  /**
   * 页面的初始数据
   */

  data: {
    id:"",
    avatarUrl:"",
    name:"",
    nickName:"",
    acStartDateTime:"",
    acEndDateTime:"",
    signEndDateTime:"",
    longitude:"",
    latitude:"",
    placeName:"",
    introduction:"",
    signUpNum:"",
    maxMembers:"",
    fee:"",
    feePicId:"",
    creatorName:"",
    phoneNum:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:function(param) {
    // 注册coolsite360交互模块
    app.coolsite360.register(this);
    qcloud.setLoginUrl(config.service.loginUrl);
    this.setData({
        id: param.id
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
    const self = this;
    wx.request({
        url: 'your url',
        data: {
            acId: self.data.id
        },
        success: function (e) {
            console.log("获取到的活动信息为：", e)
            self.setData({
                id: e.data.id,
                avatarUrl: e.data.avatarUrl,
                name: e.data.name,
                nickName: e.data.nickName,
                acStartDateTime: e.data.acStartDateTime,
                acEndDateTime: e.data.acEndDateTime,
                signEndDateTime: e.data.signEndDateTime,
                longitude: e.data.longitude,
                latitude: e.data.latitude,
                placeName: e.data.placeName,
                introduction: e.data.introduction,
                signUpNum: e.data.signUpNum,
                maxMembers: e.data.maxMembers,
                fee: e.data.fee,
                feePicId:e.data.feePicId,
                creatorName:e.data.creatorName,
                phoneNum:e.data.phoneNum
            })
        },
        fail: function (err) {
            console.log("获取活动信息失败：", err)
        }
    })
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
      const self = this;
      wx.request({
          url: 'your url',
          data: {
              acId: self.data.id
          },
          success: function (e) {
              console.log("获取到的活动信息为：", e)
              self.setData({
                  id: e.data.id,
                  avatarUrl: e.data.avatarUrl,
                  name: e.data.name,
                  nickName: e.data.nickName,
                  acStartDateTime: e.data.acStartDateTime,
                  acEndDateTime: e.data.acEndDateTime,
                  signEndDateTime: e.data.signEndDateTime,
                  longitude: e.data.longitude,
                  latitude: e.data.latitude,
                  placeName: e.data.placeName,
                  introduction: e.data.introduction,
                  signUpNum: e.data.signUpNum,
                  maxMembers: e.data.maxMembers,
                  fee: e.data.fee
              })
              wx.stopPullDownRefresh();
              wx.showToast({
                  title: '刷新成功',
                  icon:'success'
              })
          },
          fail: function (err) {
              console.log("获取活动信息失败：", err)
          }
      })
  },

  //以下为自定义点击事件
  
  tap_fe68ff07:function(e){
    //触发coolsite360交互事件
    app.coolsite360.fireEvent(e,this);
  },
  
  tap_7cf35a4a:function(e){
    //触发coolsite360交互事件
    app.coolsite360.fireEvent(e,this);
  },
  
  tap_e2bd485d:function(e){
    //触发coolsite360交互事件
    app.coolsite360.fireEvent(e,this);
  },
  
  tap_d6c84484:function(e){
    //触发coolsite360交互事件
    app.coolsite360.fireEvent(e,this);
  },
  
  tap_3ec69114:function(e){
    //触发coolsite360交互事件
    app.coolsite360.fireEvent(e,this);
  },
  
  tap_26641a03:function(e){
    //触发coolsite360交互事件
    app.coolsite360.fireEvent(e,this);
  },
  
  tap_22930b74:function(e){
    //触发coolsite360交互事件
    app.coolsite360.fireEvent(e,this);
  },
  onShareAppMessage:function(res){
      if (res.from === 'button') {
          // 来自页面内转发按钮
          console.log(res.target)
      }
      return {
          title: this.data.name,
          path: '/page/shareactivity/shareactivity?id='+this.data.id,
          success: function (res) {
              console.log("转发成功",res)
          },
          fail: function (res) {
              console.log("转发失败", res)
          }
      }
  },
  showLocation(){
      wx.openLocation({
        latitude: parseFloat(this.data.latitude),
        longitude: parseFloat(this.data.longitude),
      })
  },
  checkSignUpCondition(){
      var result = new Object();
      var nowDateTimeString = util.formatDate()+' '+util.formatTime();
      var nowDateTime = new Date(nowDateTimeString);
      var signEndDateTimeString = this.data.signEndDateTime;
      var signEndDateTime = new Date(signEndDateTimeString);
      if(signEndDateTime<nowDateTime){
          result.status = false;
          result.data = '报名截止时间已到！'
      }else if(this.data.signUpNum>=this.data.maxMembers){
          result.status = false;
          result.data = '活动人数已满！'
      }else{
          result.status = true;
          result.data = '可以报名'
      }
      return result;
  },
  signUp(){
      const self = this;
      var response = new Object();
      wx.showLoading({
        title: '请稍等',
      })
      qcloud.request({
          login: true,
          data: {
              acId: self.data.id
          },
          url: 'your url',
          success: function (res) {
            wx.hideLoading();
              console.log("请求到的数据为：res.data.status:", res.data.status, "res.data.data.status:", res.data.data.status)
              //   response = res.data
              if (res.data.status && res.data.data.status == 0) {
                  console.log("无法报名，已被剔除！");
                  wx.showModal({
                      title: '无法报名',
                      content: '您已被活动发起人取消了报名！',
                  })
              } else if (res.data.status && res.data.data.status == 1) {
                  console.log("已经报名过，正在跳转");
                  wx.navigateTo({
                      url: '../showmysignupinfo/showmysignupinfo?acId=' + self.data.id + '&openId=' + res.data.data.openId+'&fee='+self.data.fee+'&feePicId='+self.data.feePicId+'&creatorName='+self.data.creatorName+'&phoneNum='+self.data.phoneNum,
                  });
              } else {
                  console.log("没有报过名，判断报名条件是否满足。");
                  var result = self.checkSignUpCondition();
                  if (!result.status) {
                      console.log("无法报名",result.data);
                      wx.showModal({
                          title: '无法报名',
                          content: result.data,
                          success: function (res) {
                              if (res.confirm) {
                                  console.log('用户点击确定')
                              } else if (res.cancel) {
                                  console.log('用户点击取消')
                              }
                          }
                      })
                  } else {
                      wx.navigateTo({
                          url: '../signup/signup?fee=' + self.data.fee + '&id=' + self.data.id+'&openId='+res.data.data+'&feePicId='+self.data.feePicId,
                      })
                  }
              }
          },
          fail: function (err) {
              console.log("请求失败", err)
          }
      });
  },
  makePhoneCall(){
      wx.makePhoneCall({
          phoneNumber: this.data.phoneNum,
      })
  }
})

