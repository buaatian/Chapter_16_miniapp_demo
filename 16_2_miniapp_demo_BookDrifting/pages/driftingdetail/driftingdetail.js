const request = require("../../utils/requests");
const request2 = require("../../utils/requests2");
var star = require("../../utils/star");
var QR = require("../../utils/qrcode.js");
const input = require('../../utils/input');
const config = require('../../utils/config2');
const geo = require('../../utils/geo');
const util = require('../../utils/util');
var app = getApp()
var userid = app.globalData.userInfo.id;

Page({
  data: {
    id:"",
    launchposition:"",
    starttime:"",
    launchperson:"",
    status:"",
    scanid:"",
    actid:"",
    jd:"",
    wd:"",
  },
  bindSubmit: function () {
    var that = this;
    wx.showModal({
      title: '确认签到并参加活动吗？',
      content: '',
      success: function (res) {
        if (res.confirm == true) {
          if (userid == null) {
            wx.showModal({
              title: '签到失败',
              content: '您还没有登陆，请先登录',
            })
          }
          else {
            wx.scanCode({
              success:function(res){
                that.setData({scanid:res.result});
                console.log(that);
                request.searchBook({q:that.data.scanid},function(res){
                  if (res.data.books[0].id==that.data.id){
                    wx.request({
                      url: 'https://driftingbooks.xyz/activities/'+that.data.actid,
                      method: 'Put',
                      data:{
                        pid:userid,
                        status:"1",
                      },
                      success: function (res) {
                        console.log("成功")
                      },
                      fail: function () {
                        console.log("失败")
                      },
                      complete: function () { 
                      }
                    })
                    
                    wx.request({
                      url: 'https://driftingbooks.xyz/favorites',
                      data: {
                        userId: userid,
                        doubanId: that.data.id,
                      },
                      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                      "Content-Type": "application/json",
                    })

                    wx.request({
                      url: 'https://driftingbooks.xyz/notes',
                      data: {
                        userId: userid,
                        doubanId: that.data.id,
                      },
                      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                      "Content-Type": "application/json",
                    })

                    wx.showModal({
                      title: '签到成功',
                      content: '漂流继续',
                    })
                  }
                  else{
                    wx.showModal({
                      title: '签到失败',
                      content: '书籍错误',
                    })
                  }
                })
              }
            })
          }
        }
      },
    })
  },

  onLoad: function (options) {
    var that = this;
    userid = app.globalData.userInfo.id;
    that.setData({ 
      id: options.id,
      launchposition: options.pt,
      starttime:options.sd,
      launchperson:options.pr,
      actid:options.actid,
      status:options.status,
      jd:options.jd,
      wd:options.wd,
    });
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    })
    console.log("传入测试：")
    console.log(that)
    request.getBookById(that.data.id, function (res) {
      var types = res.data;
      var rating = types.rating;
      rating.block = star.get_star(rating.average);

      res.data = types;
      console.log(res.data);

      that.setData({ bookInfo: res.data });
    });
  },
  onReady: function () {
    wx.hideToast();
  },
  onShow: function () {
    console.log("显示");
    var that = this;
    console.log(that.data.id);
    userid = app.globalData.userInfo.id;
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },

  onShareAppMessage: function () {
    var that = this;
    var title = '分享漂流活动： ' + that.data.bookInfo.title;
    var bid=that.data.id;
    var launchperson=that.data.launchperson;
    var launchposition=that.data.launchposition;
    var starttime=that.data.starttime;
    var actid=that.data.actid;
    var status=that.data.status;
    var jd=that.data.jd;
    var wd=that.data.wd;
    return {
      title: title,
      path: '/pages/driftingdetail/driftingdetail?id='+bid+'&&pt='+launchposition+'&&pr='+launchperson+'&&sd='+starttime+'&&actid='+actid+"&&status="+status+"&&jd="+jd+"&&wd="+wd,
    }
  }

})


