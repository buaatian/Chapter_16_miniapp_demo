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
  name: "newactivity",
  /**
   * 页面的初始数据
   */

  data: {
    placeName:"",
    acStartDate:"",
    acStartTime:"",
    acEndDate:"",
    acEndTime:"",
    signEndDate:"",
    signEndTime:"",
    longitude:"",
    latitude:"",
    requestUrl:'your url',
    uploadFileUrl:'your url',
    show:"",
    feePicId:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    // 注册coolsite360交互模块
    app.coolsite360.register(this);
    this.setData({
        acStartDate:util.formatDate(),
        acStartTime: util.formatTime(),
        acEndDate:util.formatDate(),
        acEndTime: util.formatTime(),
        signEndDate: util.formatDate(),
        signEndTime: util.formatTime(),
    });
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
  
  // tap_6f6f6349:function(e){
  //   //触发coolsite360交互事件
  //   app.coolsite360.fireEvent(e,this);
  // },
  chooseLocation:function(e){
    var self = this;
    wx.chooseLocation({
      success: function(res) {
        self.setData({
          placeName: res.name,
          longitude:res.longitude,
          latitude:res.latitude
        })
      },
    })
  },
  acStartDateChange:function(e){
    console.log('开始日期',e.detail.value);
    this.setData({
      acStartDate:e.detail.value,
      signEndDate:e.detail.value,
      acEndDate:e.detail.value,
    });
  },
  acStartTimeChange: function (e) {
    console.log('开始时间',e.detail.value);
    this.setData({
      acStartTime: e.detail.value,
      signEndTime: e.detail.value,
      acEndTime:e.detail.value
    });
  },
  acEndDateChange: function (e) {
    console.log('结束日期',e.detail.value);
    this.setData({
      acEndDate: e.detail.value
    });
    var result = this.checkacEndDateTime();
    if (!result.status) {
        this.setData({
            acEndDate: this.data.acStartDate,
            acEndTime:this.data.acStartTime
        });
    }
  },
  acEndTimeChange: function (e) {
    console.log('结束时间',e.detail.value);
    this.setData({
      acEndTime: e.detail.value
    });
    var result = this.checkacEndDateTime();
    if (!result.status) {
        this.setData({
            acEndDate: this.data.acStartDate,
            acEndTime: this.data.acStartTime
        });
    }
  },
  signEndDateChange: function (e) {
    console.log('报名截止日期',e.detail.value);
    this.setData({
      signEndDate: e.detail.value
    });
    var result = this.checkSignEndDateTime();
    if (!result.status) {
        this.setData({
            signEndDate: this.data.acStartDate,
            signEndTime:this.data.acStartTime
        });
    }
  },
  signEndTimeChange: function (e) {
    console.log('报名截止时间',e.detail.value);
    this.setData({
      signEndTime: e.detail.value
    });
    var result = this.checkSignEndDateTime();
    if (!result.status) {
        this.setData({
            signEndDate: this.data.acStartDate,
            signEndTime: this.data.acStartTime
        });
    }
  },
  checkacEndDateTime:function(){
      var result = new Object();
      var acStartDateTimeString = this.data.acStartDate + ' ' + this.data.acStartTime;
      var acStartDateTime = new Date(acStartDateTimeString);
      var acEndDateTimeString = this.data.acEndDate + ' ' + this.data.acEndTime;
      var acEndDateTime = new Date(acEndDateTimeString);
      if (acEndDateTime <= acStartDateTime) {
          result.status = false;
          result.data = "活动的结束时间必须晚于活动的开始时间！";
      }else {
          result.status = true;
      }
      if (!result.status) {
          wx.showModal({
              title: '时间填写错误',
              content: result.data,
              showCancel: false,
              confirmText: '返回修改'
          })
      }
      console.log('判断结果是', result);
      return result;
  },
  checkSignEndDateTime:function(){
      var result = new Object();
      var acStartDateTimeString = this.data.acStartDate + ' ' + this.data.acStartTime;
      var acStartDateTime = new Date(acStartDateTimeString);
      var acEndDateTimeString = this.data.acEndDate + ' ' + this.data.acEndTime;
      var acEndDateTime = new Date(acEndDateTimeString);
      var signEndDateTimeString = this.data.signEndDate + ' ' + this.data.signEndTime;
      var signEndDateTime = new Date(signEndDateTimeString);
      var nowDateTimeString = util.formatDate() + ' ' + util.formatTime();
      var nowDateTime = new Date(nowDateTimeString);
      if (signEndDateTime > acEndDateTime) {
          result.status = false;
          result.data = "报名的截止时间不能晚于活动的结束时间！"
      } else if (signEndDateTime < nowDateTime) {
          result.status = false;
          result.data = "报名的截止时间不能早于当前时间！"
      } else {
          result.status = true;
      }
      if (!result.status) {
          wx.showModal({
              title: '时间填写错误',
              content: result.data,
              showCancel: false,
              confirmText: '返回修改'
          })
      }
      console.log('判断结果是', result);
      return result;
  },
  checkDateTime:function(){
      var result = new Object();
      var acStartDateTimeString = this.data.acStartDate + ' ' + this.data.acStartTime;
      var acStartDateTime = new Date(acStartDateTimeString);
      var acEndDateTimeString = this.data.acEndDate + ' ' + this.data.acEndTime;
      var acEndDateTime = new Date(acEndDateTimeString);
      var signEndDateTimeString = this.data.signEndDate + ' ' + this.data.signEndTime;
      var signEndDateTime = new Date(signEndDateTimeString);
      var nowDateTimeString = util.formatDate()+' '+util.formatTime();
      var nowDateTime = new Date(nowDateTimeString);
      if (acEndDateTime <= acStartDateTime) {
          result.status = false;
          result.data = "活动的结束时间必须晚于活动的开始时间！";
      } else if (signEndDateTime > acEndDateTime) {
          result.status = false;
          result.data = "报名的截止时间不能晚于活动的结束时间！"
      } else if(signEndDateTime<nowDateTime){
          result.status = false;
          result.data = "报名的截止时间不能早于当前时间！"
      }else {
          result.status = true;
      }
      if(!result.status){
          wx.showModal({
              title: '时间填写错误',
              content: result.data,
              showCancel:false,
              confirmText:'返回修改'
          })
      }
      console.log('判断结果是',result);
      return result;
  },
  checkLegal:function(content){
      var result = new Object();
      var longitude = this.data.longitude;
      var latitude = this.data.latitude;
      var feePicId = this.data.feePicId;
      var name = content.detail.value.name;
      var acStartDateTimeString = content.detail.value.acStartDate + ' ' + content.detail.value.acStartTime;
      var acStartDateTime = new Date(acStartDateTimeString);
      var acEndDateTimeString = content.detail.value.acEndDate + ' ' + content.detail.value.acEndTime;
      var acEndDateTime = new Date(acEndDateTimeString);
      var signEndDateTimeString = content.detail.value.signEndDate + ' ' + content.detail.value.signEndTime;
      var signEndDateTime = new Date(signEndDateTimeString);
      var nowDateTimeString = util.formatDate() + ' ' + util.formatTime();
      var nowDateTime = new Date(nowDateTimeString);
      var placeName = content.detail.value.placeName;
      var introduction = content.detail.value.introduction;
      var maxMembers = content.detail.value.maxMembers;
      var fee = content.detail.value.fee;
      if(!name){
          result.status = false;
          result.data = "活动名称不能为空！";
      }else if(!placeName||!longitude||!latitude){
          result.status = false;
          result.data = "请选择地点！";
      }else if(!fee){
          result.status=false;
          result.data = "请输入活动费用。若免费请输入0。";
      }else if(!maxMembers){
          result.status = false;
          result.data = "请输入活动最大限制人数！";
      }else if (!introduction) {
          result.status = false;
          result.data = "请填写活动简介，没有请填无！";
      }else if(acEndDateTime<=acStartDateTime){
          result.status = false;
          result.data = "活动的结束时间必须晚于活动的开始时间！";
      }else if(signEndDateTime>acEndDateTime){
          result.status = false;
          result.data = "报名的截止时间不能晚于活动的结束时间！"
      } else if (signEndDateTime < nowDateTime) {
          result.status = false;
          result.data = "报名的截止时间不能早于当前时间！"
      }else if(fee>0 && !feePicId){
          result.status = false;
          result.data = "您还没有上传您的个人收款图片"
      }else{
          result.status = true;
          result.data = {
              name:name,
              acStartDateTime:acStartDateTimeString,
              acEndDateTime:acEndDateTimeString,
              signEndDateTime:signEndDateTimeString,
              longitude:longitude,
              latitude:latitude,
              placeName:placeName,
              introduction:introduction,
              maxMembers:maxMembers,
              fee:fee,
              feePicId:this.data.feePicId
          };
      }
      return result;
  },
  addNewActivity:function(e){
      var result = this.checkLegal(e);
      if(!result.status){
          wx.showModal({
              title: '填写信息错误',
              content: result.data,
              showCancel:false,
              confirmText:'返回修改',
              success: function (res) {
                  if (res.confirm) {
                      console.log('用户点击确定')
                  } else if (res.cancel) {
                      console.log('用户点击取消')
                  }
              }
          })
      }else{
          console.log(result.data);
          wx.showLoading({
            title: '请稍等',
          })
          qcloud.request({
              login:true,
              url: this.data.requestUrl,
              data:result.data,
              success:function(res){
                  if(res.data.code == 1){
                    wx.hideLoading();
                      wx.showToast({
                          title: '创建活动成功',
                          icon:'success',
                          duration:1500
                      })
                      console.log("创建的活动ID为：",res.data.id);
                      setTimeout(function () {
                          wx.redirectTo({
                              url: '../shareactivity/shareactivity?id=' + res.data.id,
                          })
                      }, 1500)
                  }
              }
          })
      }
  },
  formReset: function () {
    console.log('form发生了reset事件')
  },
  showUpload:function(e){
      this.setData({
          show:e.detail.value
      })
      console.log("费用输入的数字是：",this.data.show);
  },
chooseImage: function() {
    var self = this

    wx.chooseImage({
      count: 1,
      sizeType: ['original '],
      sourceType: ['album'],
      success: function(res) {
        console.log('chooseImage success, temp path is', res.tempFilePaths[0])

        var imageSrc = res.tempFilePaths[0]
        wx.showLoading({
            title: '正在上传',
        })
        wx.uploadFile({
          url: self.data.uploadFileUrl,
          filePath: imageSrc,
          name: 'feePic',
          success: function(res) {
              console.log('uploadImage success, res is:', res.data)
              var obj = JSON.parse(res.data);
              console.log('转换后的json对象为：',obj);
              if (obj.status == true){
                wx.hideLoading();
                wx.showToast({
                    title: '上传成功',
                    icon: 'success',
                    duration: 1000
                })
                self.setData({
                    imageSrc,
                    feePicId:obj.data
                })
            }else{
                wx.hideToast();
                wx.showModal({
                    title: '上传文件失败',
                    content: obj.data,
                })
            }
          },
          fail: function({errMsg}) {
            console.log('uploadImage fail, errMsg is', errMsg)
          }
        })

      },
      fail: function({errMsg}) {
        console.log('chooseImage fail, err is', errMsg)
      }
    })
  }
})

