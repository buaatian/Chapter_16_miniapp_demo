const request = require("../../utils/requests");
var star = require("../../utils/star");
var QR = require("../../utils/qrcode.js");
const input = require('../../utils/input');
const config = require('../../utils/config2');
const geo = require('../../utils/geo');
const util = require('../../utils/util');
const IMAGE = 'IMAGE';
const mediaActionSheetItems = ['拍照', '选择照片'];
const mediaActionSheetBinds = ['chooseImage', 'chooseImage'];
var app = getApp()
var userid = app.globalData.userInfo.id;
var bkn = app.globalData.userInfo.preparebookname;

Page({
  data: {
    bookname:bkn,
    count: 0,
    imgUrls: [
      "../../images/pic3.jpg",
      "../../images/pic4.jpg"
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    toRe: 0,
    showLoading: false,
    loadingMessage: '',
    showMode: 'common',
    poi: null,
    mediaActionSheetHidden: true,
    mediaActionSheetItems: mediaActionSheetItems,
    mediaActionSheetBinds: mediaActionSheetBinds,
    showTab: true,
    showLoading: true,
    value:"",
    flag:"0",
  },

  onLoad: function (options) {
    var that = this;
    var time = util.formatTime(new Date());
    that.getPoi();

    // //清除
    // wx.request({
    //   url: 'https://driftingbooks.xyz/activities/clear',
    //   //这里的data是上传的数据
    //   method: 'DELETE', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    //   "Content-Type": "application/json",
    //   // header: {}, // 设置请求的 header  
    //   success: function (res) {
    //     console.log("上传")
    //   },
    // })

    
    this.setData({
      time: time,
      bookname:app.globalData.userInfo.preparebookname,
    });  
    this.setData({ showLoading: false });
  },
  changeValue: function (e) {
    this.setData({ value: e.detail.value });
  },
  jumpToSearch: function () {
    var that = this;
    console.log(that.data.value)
    wx.navigateTo({
      url: '../../pages/search/search?id=' + that.data.value
    })
  },
  bindSubmit:function()
  {
    var that = this;
    var position=that.data.poi.name;
    var jingdu = that.data.poi.latitude;
    var weidu = that.data.poi.longitude;
    console.log("地址：");
    console.log(that.data.poi);
    var dbid = app.globalData.userInfo.preparedoubanid;
    var timandname = that.data.time ;
    
    wx.showModal({
      title: '确认发起活动吗？',
      content: '',
      success: function (res) {
        if (res.confirm == true) {
          console.log('用户'+userid);
          if (userid == null) {
            wx.showModal({
              title: '发起失败',
              content: '您还没有登陆，请先登录',
            })
          }
          else if (app.globalData.userInfo.preparebookname == '暂未选择')
          {
            wx.showModal({
              title: '发起失败',
              content: '请先输入书名',
            })
          }
          else {
            wx.request({
              url: 'https://driftingbooks.xyz/activities',
              //这里的data是上传的数据
              data: {
                location:position,
                doubanId:dbid ,
                startDate: timandname,
                hid:userid,
                bName: app.globalData.userInfo.preparebookname ,
                imageUrl: "../../images/pic" + toRefresh()+".jpg",
                jingDu:jingdu,
                weiDu:weidu,
              },
              method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
              "Content-Type": "application/json",
              // header: {}, // 设置请求的 header  
              success: function (res) {
                console.log("上传")
              },
            })

            wx.showModal({
              title: '发起成功',
              content: '活动发起成功,您可以在漂流活动查看',
            })
          }
        }
      },
    })
  },
  onReady: function () {
  },
  onShow: function () {
    var time = util.formatTime(new Date());
    this.setData({
      time: time,
      bookname: app.globalData.userInfo.preparebookname,
    });  
    userid = app.globalData.userInfo.id;
  },
  onHide: function () {
  },
  onUnload: function () {
  },
  datePickerBindchange: function (e) {
    this.setData({
      dateValue: e.detail.value
    })
  },
  showTab() {
    this.setData({ showTab: true });
  },

  hideTab() {
    this.setData({ showTab: false });
  },

  showLoading(loadingMessage) {
    this.setData({ showLoading: true, loadingMessage });
  },

  hideLoading() {
    this.setData({ showLoading: false, loadingMessage: '' });
  },

  mediaTouch() {
    let that = this;
    wx.chooseImage({
      count: 1, 
      sizeType: ['origin', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        this.setData({ mediaActionSheetHidden: true });
        this.setData({ flag: '1' });
        this.showLoading('图片处理中...');
        var tempFilePath = res.tempFilePaths;
        this.setData({ 'bookNode.image': tempFilePath });
        this.hideLoading();
        this.showTab();
      }
    })
  },

  mediaActionSheetChange(event) {
    this.setData({
      showTab: true,
      mediaActionSheetHidden: true,
    })
  },

  // 获得当前位置信息
  getPoi() {
    var that = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        geo.mapRequest(
          'geocoder',
          { 'location': geo.formatLocation(res) },
          loc => {
            let poi = {
              'latitude': res.latitude,
              'longitude': res.longitude,
              'name': loc.result.address,
            };
            that.setData({ poi: poi });
          })
      }
    })
  },
  delImage: function (e) {
    this.setData({ 'bookNode.image': null });
  },
})

function toRefresh() {
  var num = Math.random();  //Math.random()：得到一个0到1之间的随机数
  num =101+ Math.ceil(num * 8);  
  var str;
  str = num.toString();
  return str;
}