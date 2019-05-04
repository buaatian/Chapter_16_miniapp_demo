
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
  name: "editactivity",
  /**
   * 页面的初始数据
   */

  data: {
      acId:"",
      name:"",
      acStartTime:"",
      acStartDate:"",
      acEndDate:"",
      acEndTime:"",
      signEndDate:"",
      signEndTime:"",
      longitude:"",
      latitude:"",
      placeName:"",
      introduction:"",
      maxMembers:"",
      fee:"",
      show: "",
      feePicId:"",
      downloadUrl:"",
      imageSrc:"",
      uploadFileUrl: 'your file upload url',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:function(param) {
    // 注册coolsite360交互模块
    app.coolsite360.register(this);
    this.setData({
        acId:param.acId
    })
    const self = this;
    wx.request({
        url: 'your url',
        data:{
            acId:self.data.acId
        },
        success:function(res){
            console.log("获取到的活动信息数据为：",res.data);
            var acStartDateTime = res.data.acStartDateTime;
            var acEndDateTime = res.data.acEndDateTime;
            var signEndDateTime = res.data.signEndDateTime;
            var acStart = acStartDateTime.split(" ");
            var acStartTimeString = acStart[1];
            // acStartTimeString = acStartTimeString.substr(0, acStartTimeString.length - 3);
            var acEnd = acEndDateTime.split(" ");
            var acEndTimeString = acEnd[1];
            // acEndTimeString = acEndTimeString.substr(0, acEndTimeString.length-3);
            var signEnd = signEndDateTime.split(" ");
            var signEndTimeString = signEnd[1];
            // signEndTimeString = signEndTimeString.substr(0, signEndTimeString.length - 3);
            self.setData({
                name:res.data.name,
                acStartDate:acStart[0],
                acStartTime: acStartTimeString,
                acEndDate:acEnd[0],
                acEndTime: acEndTimeString,
                signEndDate:signEnd[0],
                signEndTime: signEndTimeString,
                longitude:res.data.longitude,
                latitude:res.data.latitude,
                placeName:res.data.placeName,
                introduction:res.data.introduction,
                maxMembers:res.data.maxMembers,
                fee:res.data.fee,
                feePicId:res.data.feePicId,
                show:res.data.fee,
            });
            if(res.data.fee > 0){
                var downloadUrl = 'your url';
                wx.downloadFile({
                    url:downloadUrl,
                    success: function (res) {
                        self.setData({
                            imageSrc: res.tempFilePath,
                        })
                    }
                })
            }         
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
  
  tap_801d42c4:function(e){
    //触发coolsite360交互事件
    app.coolsite360.fireEvent(e,this);
  },
  
  tap_23f1579a:function(e){
    //触发coolsite360交互事件
    app.coolsite360.fireEvent(e,this);
  },
  chooseLocation: function (e) {
      var self = this;
      wx.chooseLocation({
          success: function (res) {
              self.setData({
                  placeName: res.name,
                  longitude: res.longitude,
                  latitude: res.latitude
              })
          },
      })
  },
  acStartDateChange: function (e) {
      console.log('开始日期', e.detail.value);
      this.setData({
          acStartDate: e.detail.value,
          signEndDate: e.detail.value,
          acEndDate: e.detail.value,
      });
  },
  acStartTimeChange: function (e) {
      console.log('开始时间', e.detail.value);
      this.setData({
          acStartTime: e.detail.value,
          signEndTime: e.detail.value,
          acEndTime: e.detail.value
      });
  },
  acStartDateChange: function (e) {
      console.log('开始日期', e.detail.value);
      this.setData({
          acStartDate: e.detail.value,
          signEndDate: e.detail.value,
          acEndDate: e.detail.value,
      });
  },
  acStartTimeChange: function (e) {
      console.log('开始时间', e.detail.value);
      this.setData({
          acStartTime: e.detail.value,
          signEndTime: e.detail.value,
          acEndTime: e.detail.value
      });
  },
  acEndDateChange: function (e) {
      console.log('结束日期', e.detail.value);
      this.setData({
          acEndDate: e.detail.value
      });
      var result = this.checkacEndDateTime();
      if (!result.status) {
          this.setData({
              acEndDate: this.data.acStartDate,
              acEndTime: this.data.acStartTime
          });
      }
  },
  acEndTimeChange: function (e) {
      console.log('结束时间', e.detail.value);
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
      console.log('报名截止日期', e.detail.value);
      this.setData({
          signEndDate: e.detail.value
      });
      var result = this.checkSignEndDateTime();
      if (!result.status) {
          this.setData({
              signEndDate: this.data.acStartDate,
              signEndTime: this.data.acStartTime
          });
      }
  },
  signEndTimeChange: function (e) {
      console.log('报名截止时间', e.detail.value);
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
  checkacEndDateTime: function () {
      var result = new Object();
      var acStartDateTimeString = this.data.acStartDate + ' ' + this.data.acStartTime;
      var acStartDateTime = new Date(acStartDateTimeString);
      var acEndDateTimeString = this.data.acEndDate + ' ' + this.data.acEndTime;
      var acEndDateTime = new Date(acEndDateTimeString);
      if (acEndDateTime <= acStartDateTime) {
          result.status = false;
          result.data = "活动的结束时间必须晚于活动的开始时间！";
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
  checkSignEndDateTime: function () {
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
  checkDateTime: function () {
      var result = new Object();
      var acStartDateTimeString = this.data.acStartDate + ' ' + this.data.acStartTime;
      var acStartDateTime = new Date(acStartDateTimeString);
      var acEndDateTimeString = this.data.acEndDate + ' ' + this.data.acEndTime;
      var acEndDateTime = new Date(acEndDateTimeString);
      var signEndDateTimeString = this.data.signEndDate + ' ' + this.data.signEndTime;
      var signEndDateTime = new Date(signEndDateTimeString);
      var nowDateTimeString = util.formatDate() + ' ' + util.formatTime();
      var nowDateTime = new Date(nowDateTimeString);
      if (acEndDateTime <= acStartDateTime) {
          result.status = false;
          result.data = "活动的结束时间必须晚于活动的开始时间！";
      } else if (signEndDateTime > acEndDateTime) {
          result.status = false;
          result.data = "报名的截止时间不能晚于活动的结束时间！"
      } else if (signEndDateTime <= nowDateTime) {
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
  checkLegal: function (content) {
      var result = new Object();
      var longitude = this.data.longitude;
      var latitude = this.data.latitude;
      var name = content.detail.value.name;
      var acStartDateTimeString = content.detail.value.acStartDate + ' ' + content.detail.value.acStartTime;
      var acStartDateTime = new Date(acStartDateTimeString);
      var acEndDateTimeString = content.detail.value.acEndDate + ' ' + content.detail.value.acEndTime;
      var acEndDateTime = new Date(acEndDateTimeString);
      var signEndDateTimeString = content.detail.value.signEndDate + ' ' + content.detail.value.signEndTime;
      var signEndDateTime = new Date(signEndDateTimeString);
      var placeName = content.detail.value.placeName;
      var introduction = content.detail.value.introduction;
      var maxMembers = content.detail.value.maxMembers;
      var fee = content.detail.value.fee;
      if (!name) {
          result.status = false;
          result.data = "活动名称不能为空！";
      } else if (!placeName || !longitude || !latitude) {
          result.status = false;
          result.data = "请选择地点！";
      } else if (!fee) {
          result.status = false;
          result.data = "请输入活动费用。若免费请输入0。";
      } else if (!maxMembers) {
          result.status = false;
          result.data = "请输入活动最大限制人数！";
      } else if (!introduction) {
          result.status = false;
          result.data = "请填写活动简介，没有请填无！";
      } else if (acEndDateTime <= acStartDateTime) {
          result.status = false;
          result.data = "活动的结束时间必须晚于活动的开始时间！";
      } else if (signEndDateTime > acEndDateTime) {
          result.status = false;
          result.data = "报名的截止时间不能晚于活动的结束时间！"
      } else {
          result.status = true;
          result.data = {
              id:this.data.acId,
              name: name,
              acStartDateTime: acStartDateTimeString,
              acEndDateTime: acEndDateTimeString,
              signEndDateTime: signEndDateTimeString,
              longitude: longitude,
              latitude: latitude,
              placeName: placeName,
              introduction: introduction,
              maxMembers: maxMembers,
              fee: fee,
              feePicId:this.data.feePicId
          };
      }
      return result;
  },
  updateActivity: function (e) {
      var result = this.checkLegal(e);
      const self = this;
      if (!result.status) {
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
      } else {
          console.log(result.data);
          wx.request({
              url: 'your url',
              data: result.data,
              success: function (res) {
                  if (res.data > 0) {
                      wx.showToast({
                          title: '更新活动成功',
                          icon: 'success',
                          duration: 1500
                      })
                      setTimeout(function () {
                          wx.redirectTo({
                              url: '../shareactivity/shareactivity?id=' + self.data.acId,
                          })
                      }, 2000)
                  }else{
                      console.log("更新失败：",res.data);
                  }
              }
          })
      }
  },
  delActivity(){
      const self = this;
      wx.showModal({
          title: '警告',
          content: '确定要删除此活动吗？',
          success: function (res) {
              if (res.confirm) {
                  wx.request({
                      url: 'your url',
                      data:{
                          acId:self.data.acId
                      },
                      success:function(res){
                          if(res.data>0){
                              wx.showToast({
                                  title: '删除成功',
                                  icon:'success',
                                  duration:1500
                              })
                              setTimeout(function () {
                                  wx.navigateBack({
                                      delta: 1
                                  })
                              }, 1500)
                          }else{
                              console.log('删除失败');
                          }
                      }
                  })
              } else if (res.cancel) {
                  console.log('用户点击取消')
              }
          }
      })
  },
  chooseImage: function () {
      var self = this

      wx.chooseImage({
          count: 1,
          sizeType: ['original '],
          sourceType: ['album'],
          success: function (res) {
              console.log('chooseImage success, temp path is', res.tempFilePaths[0])

              var imageSrc = res.tempFilePaths[0]
              wx.showLoading({
                  title: '正在上传',
              })
              wx.uploadFile({
                  url: self.data.uploadFileUrl,
                  filePath: imageSrc,
                  name: 'feePic',
                  success: function (res) {
                      console.log('uploadImage success, res is:', res.data)
                      var obj = JSON.parse(res.data);
                      console.log('转换后的json对象为：', obj);
                      if (obj.status == true) {
                          wx.hideLoading();
                          wx.showToast({
                              title: '上传成功',
                              icon: 'success',
                              duration: 1000
                          })
                          self.setData({
                              imageSrc: imageSrc,
                              feePicId: obj.data,
                          })
                      } else {
                          wx.hideToast();
                          wx.showModal({
                              title: '上传文件失败',
                              content: obj.data,
                          })
                      }
                  },
                  fail: function ({ errMsg }) {
                      console.log('uploadImage fail, errMsg is', errMsg)
                  }
              })

          },
          fail: function ({ errMsg }) {
              console.log('chooseImage fail, err is', errMsg)
          }
      })
  },
  showUpload:function(e){
          if(e.detail.value>0){
              this.setData({
                  show:e.detail.value,
                  fee:e.detail.value,
              })
          }else{
              this.setData({
                  show:e.detail.value,
                  fee:e.detail.value,
                  feePicId:0
              })
          }
  }
})