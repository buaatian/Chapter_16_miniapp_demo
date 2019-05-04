var app = getApp();

const input = require('../utils/input');
const config = require('../config2');
const geo = require('../services/geo');
const util = require('../utils/util');
const urlBookNote = 'https://driftingbooks.xyz/notes/'
const loginKey = 'loginKey';
// 日记内容类型
const IMAGE = 'IMAGE';
const mediaActionSheetItems = ['选择照片'];
const mediaActionSheetBinds = ['chooseImage'];
Page({
  data: {
    // 日记对象
    bookNote: null,
    id:'',
    title:'',
    userId:'',

    // 当前位置信息
    poi: null,
    
    // 是否显示loading
    showLoading: false,

    // loading提示语
    loadingMessage: '',

    // 页面所处模式
    showMode: 'common',


    // 点击`图片`tab的action-sheet
    mediaActionSheetHidden: true,

    // 多媒体文件插入action-sheet
    mediaActionSheetItems: mediaActionSheetItems,

    // 多媒体文件插入项点击事件
    mediaActionSheetBinds: mediaActionSheetBinds,

    // 是否显示底部tab栏
    showTab: true,
    showLoading: true,
  },
  onLoad: function (options) {
    var that = this;
    that.setData({ id: options.id, title: options.title, userId: options.userId});
    var userId = that.data.userId;
    wx.setNavigationBarTitle({
      title: '<<' + options.title + '>>读书笔记'
    })
    wx.request({
      url: urlBookNote + userId + '/' + options.id,
      method:'GET',
      success: function (res) {
        console.log(urlBookNote + userId + '/' + options.id+'res:'+res.data)
        that.setData({
          bookNote: res.data,
          showLoading: false
        })
      }
    })
    that.getPoi();
  },
  // 显示底部tab
  showTab() {
    this.setData({ showTab: true });
  },

  // 隐藏底部tab
  hideTab() {
    this.setData({ showTab: false });
  },

  // 显示loading提示
  showLoading(loadingMessage) {
    this.setData({ showLoading: true, loadingMessage });
  },

  // 隐藏loading提示
  hideLoading() {
    this.setData({ showLoading: false, loadingMessage: '' });
  },

  onShow: function () {
  },

  onHide: function () {
    // 页面隐藏
  },

  onUnload: function () {
    // 页面关闭
  },
  // 点击多媒体插入按钮
  mediaTouch() {
    this.setData({
      showTab: false,
      mediaActionSheetHidden: false
    });
  },

  mediaActionSheetChange(event) {
    this.setData({
      showTab: true,
      mediaActionSheetHidden: true,
    })
  },


  chooseImage() {
    let that = this;

    wx.chooseImage({
      count: 1,  // 只能选1张
      sizeType: ['origin', 'compressed'],
      sourceType: ['album', 'camera'],

      success: (res) => {
        this.setData({ mediaActionSheetHidden: true });
        this.showLoading('图片处理中...');
        var tempFilePath = res.tempFilePaths;
        this.setData({ 'bookNote.imageUrl': tempFilePath[0] });
        console.log(this.data.bookNote.imageUrl);
        this.hideLoading();
        this.showTab();
      }
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
            that.setData({ poi: poi, 'bookNote.location':poi.name});
          })
      }
    })
  },
  delImage: function (e) {
    this.setData({ 'bookNote.imageUrl': '' });
  },
  articlechange:function(event) {
    this.setData({
      'bookNote.article': event.detail.value
    });
  },
  saveBookNote:function(){
    var note = this.data.bookNote;
    var userId = app.globalData.userInfo.id;
    console.log(note);
    if (userId==null){
      wx.showModal({
        title: '不是自己的笔记无法保存',
        showCancel: false,
      })
      return;
    }
    wx.request({
      url: urlBookNote + userId + '/' + note.doubanId,
      data: note,
      method: 'PUT',
      success: function(res) {
        if(res.data==0){
          console.log(urlBookNote + userId + '/' + note.doubanId)
          wx.showModal({
            title: '保存成功',
            showCancel: false,
          })
        }else{
          wx.showModal({
            title: '保存失败',
            showCancel: false,
          })
        }
      },
      fail: function(res) {
        console.log('更新失败')
      },
      complete: function(res) {},
    });
  },
  onShareAppMessage: function () {
    var that = this;
    var title = '分享读书笔记' ;
    var bookid = that.data.id;
    var booktitle = that.data.title
    var userId=that.data.userId;
    console.log('/pages/detail1/detail?id=' + bookid + '&title=' + booktitle + '&userId=' + userId)
    return {
      title: title,
      path: '/pages/detail1/detail?id=' + bookid + '&title=' + booktitle + '&userId=' + userId
    }
  }
})
