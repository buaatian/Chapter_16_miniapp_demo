const request = require("../../utils/requests");
var app = getApp();
const pageSize = 9;//不能超过10
var urlFavorites = 'https://driftingbooks.xyz/favorites/'
const urlBookNote = 'https://driftingbooks.xyz/notes/'
const loginKey = 'loginKey';
const mediaActionSheetItems = ['查看读书笔记', '删除读书笔记', '移出我的图书'];
const mediaActionSheetBinds = ['viewDetail', 'delBooknote', 'delBook'];
Page({
  data: {
    favorites: [],
    books: [],
    showLoading: true,
    userId: '',
    bookId: '',
    bookTitle: '',
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
  // 点击多媒体插入按钮
  mediaTouch: function (e) {
    var ds = e.currentTarget.dataset;
    this.setData({
      bookId: ds.id,
      bookTitle: ds.title,
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
  onLoad: function () {
    var that = this;
    var appUser = wx.getStorageSync(loginKey);
    that.setData({ userId: appUser.userId })
    console.log(that.data.userId);
    if (appUser.userId == null) {
      this.setData({ showLoading: false });
      wx.showModal({
        title: '请先登录',
        content: '',
        showCancel: false,
        success: function () {
          wx.switchTab({
            url: "../information/coming_soon",
          })
        }
      })
      return;
    };
    that.setData({ books: [] });
    wx.request({
      url: urlFavorites + appUser.userId,
      method: 'Get',
      success: function (res) {
        that.setData({ favorites: res.data });
        var resData = res.data;
        for (var i = 0, l = (resData.length > pageSize ? pageSize : resData.length); i < l; i++) {
          request.getBookById(resData[i].doubanId, function (res) {
            var arrayt = that.data.books;
            arrayt.push(res.data);
            that.setData({ books: arrayt })
          });
        };
        that.setData({ showLoading: false });
      },
      fail: function () {
        console.log('获取失败');
      }
    })
  },
  onShow: function () {
    var that = this;
    var appUser = wx.getStorageSync(loginKey);
    that.setData({ userId: appUser.userId })
    console.log(that.data.userId);
    if (appUser.userId == null) {
      this.setData({ showLoading: false ,books:[]});
      wx.showModal({
        title: '请先登录',
        content: '',
        showCancel: false,
        success: function () {
          wx.switchTab({
            url: "../information/coming_soon",
          })
        }
      })
      return;
    };
    wx.request({
      url: urlFavorites + appUser.userId,
      method: 'Get',
      success: function (res) {
        var fav = that.data.favorites;
        if (fav.length == res.data.length) {
          return;
        }
        that.setData({ favorites: res.data });
        var resData = res.data;
        that.setData({ books: [] });
        for (var i = 0, l = (resData.length > pageSize ? pageSize : resData.length); i < l; i++) {
          request.getBookById(resData[i].doubanId, function (res) {
            var arrayt = that.data.books;
            arrayt.push(res.data);
            that.setData({ books: arrayt })
          });
        };
        that.setData({ showLoading: false });
      },
      fail: function () {
        console.log('获取失败');
      }
    })
  },
  viewDetail: function () {
    this.setData({
      showTab: true,
      mediaActionSheetHidden: true
    })
    var ds = this.data;
    console.log('../detail1/detail?id=' + ds.bookId + '&title=' + ds.bookTitle + '&userId=' + ds.userId)
    wx.navigateTo({
      url: '../detail1/detail?id=' + ds.bookId + '&title=' + ds.bookTitle + '&userId=' + ds.userId
    })
  },
  delBooknote: function () {
    var that = this;
    var ds = that.data;
    wx.request({
      url: urlBookNote + ds.userId + '/' + ds.bookId,
      data: {
        userId: ds.userId, doubanId: ds.bookId, article: '', imageUrl: '', location: ''
      },
      method: 'PUT',
      success: function (res) {
        console.log(urlBookNote + ds.userId + '/' + ds.bookId, )
        if (res.data == 0) {
          wx.showModal({
            title: '删除成功',
            showCancel: false,
          })
        } else {
          wx.showModal({
            title: '删除失败',
            showCancel: false,
          })
        }
        that.setData({
          showTab: true,
          mediaActionSheetHidden: true,
          bookId: '',
          bookTitle: '',
        })
        // var appUser = wx.getStorageSync(loginKey);
        // that.setData({ books: [] });
        // wx.request({
        //   url: urlFavorites + appUser.userId,
        //   method: 'Get',
        //   success: function (res) {
        //     that.setData({ favorites: res.data });
        //     var resData = res.data;
        //     for (var i = 0, l = (resData.length > pageSize ? pageSize : resData.length); i < l; i++) {
        //       request.getBookById(resData[i].doubanId, function (res) {
        //         var arrayt = that.data.books;
        //         arrayt.push(res.data);
        //         that.setData({ books: arrayt })
        //       });
        //     };
        //     that.setData({ showLoading: false });
        //   },
        //   fail: function () {
        //   }
        // })
      },
      fail: function (res) {
        wx.showModal({
          title: '删除失败',
          showCancel: false,
        })
      },
      complete: function (res) { },
    })
  },
  delBook: function () {
    var that = this;
    var ds = that.data;
    wx.request({
      url: urlFavorites,
      data: {
        userId: ds.userId,
        doubanId: ds.bookId,
      },
      method: 'DELETE',
      success: function (res) {
        that.setData({
          showTab: true,
          mediaActionSheetHidden: true,
          bookId: '',
          bookTitle: '',
        })
        var appUser = wx.getStorageSync(loginKey);
        that.setData({ books: [] });
        wx.request({
          url: urlFavorites + appUser.userId,
          method: 'Get',
          success: function (res) {
            that.setData({ favorites: res.data });
            var resData = res.data;
            for (var i = 0, l = (resData.length > pageSize ? pageSize : resData.length); i < l; i++) {
              request.getBookById(resData[i].doubanId, function (res) {
                var arrayt = that.data.books;
                arrayt.push(res.data);
                that.setData({ books: arrayt })
              });
            };
            that.setData({ showLoading: false });
          },
          fail: function () {
          }
        })
      },
      fail: function (res) {
        wx.showModal({
          title: '删除失败',
          showCancel: false,
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        })
      },
      complete: function (res) { },
    })
  }
})
